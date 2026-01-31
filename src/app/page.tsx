"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Camera,
  Loader2,
  Pencil,
  Plus,
  Receipt,
  Trash2,
} from "lucide-react";

import type { Category, ExpenseItem } from "@/lib/types";
import { CATEGORIES, normalizeCategory } from "@/lib/category";
import { CATEGORY_COLORS } from "@/lib/types";
import { todayYmd, isSameMonth } from "@/lib/date";
import { deleteExpense, loadExpenses, upsertExpense } from "@/lib/storage";
import { newId } from "@/lib/id";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type VisionResponse = {
  store: string;
  amount: number;
  date: string;
  category: Category;
};

const SUPPORTED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

function fileToBase64(file: File) {
  return new Promise<{ base64: string; mediaType: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File read failed"));
    reader.onload = () => {
      const result = String(reader.result || "");
      const comma = result.indexOf(",");
      if (!result.startsWith("data:") || comma === -1) {
        reject(new Error("Unexpected data URL"));
        return;
      }
      const header = result.slice(5, comma); // e.g. image/jpeg;base64
      const mediaType = header.split(";")[0] || "image/jpeg";
      const base64 = result.slice(comma + 1);
      resolve({ base64, mediaType });
    };
    reader.readAsDataURL(file);
  });
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editDraft, setEditDraft] = useState<ExpenseItem | null>(null);

  const [addOpen, setAddOpen] = useState(false);
  const [addDraft, setAddDraft] = useState<Partial<ExpenseItem>>({
    store: "",
    amount: 0,
    date: todayYmd(),
    category: "其他",
    note: "",
  });

  // 關鍵邏輯：第一次進入頁面時，從 LocalStorage 還原既有記帳資料
  useEffect(() => {
    const items = loadExpenses();
    setExpenses(items);
  }, []);

  const thisMonth = useMemo(() => new Date(), []);
  const thisMonthExpenses = useMemo(
    () => expenses.filter((x) => isSameMonth(x.date, thisMonth)),
    [expenses, thisMonth],
  );

  const pieData = useMemo(() => {
    const map = new Map<Category, number>();
    for (const item of thisMonthExpenses) {
      map.set(item.category, (map.get(item.category) ?? 0) + item.amount);
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [thisMonthExpenses]);

  const totalThisMonth = useMemo(
    () => thisMonthExpenses.reduce((sum, x) => sum + x.amount, 0),
    [thisMonthExpenses],
  );

  async function handlePickFile() {
    fileInputRef.current?.click();
  }

  async function handleFileSelected(file: File | null) {
    if (!file) return;
    setError(null);
    setIsLoading(true);

    try {
      const { base64, mediaType } = await fileToBase64(file);

      if (!SUPPORTED_MEDIA_TYPES.includes(mediaType as any)) {
        setError("目前僅支援 JPG/PNG/GIF/WebP，請更換圖片格式");
        return;
      }

      // 關鍵邏輯：送圖片到後端 API route，避免在瀏覽器暴露 API Key
      const res = await fetch("/api/vision/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mediaType }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as unknown;
        setError(`辨識失敗（${res.status}）`);
        throw new Error(JSON.stringify(data));
      }

      const data = (await res.json()) as VisionResponse;

      const newItem: ExpenseItem = {
        id: newId(),
        store: data.store,
        amount: Number(data.amount) || 0,
        date: data.date || todayYmd(),
        category: normalizeCategory(data.category),
        createdAt: new Date().toISOString(),
      };

      const next = upsertExpense(newItem);
      setExpenses(next);
    } catch (e) {
      setError((prev) => prev ?? "發生未知錯誤，請再試一次或改用手動修正");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function openEdit(item: ExpenseItem) {
    setEditDraft(item);
    setEditOpen(true);
  }

  function applyEdit() {
    if (!editDraft) return;

    // 關鍵邏輯：手動修正後覆寫 LocalStorage 內容
    const fixed: ExpenseItem = {
      ...editDraft,
      store: editDraft.store.trim() || "(未命名)",
      amount: Number(editDraft.amount) || 0,
      date: editDraft.date || todayYmd(),
      category: normalizeCategory(editDraft.category),
    };

    const next = upsertExpense(fixed);
    setExpenses(next);
    setEditOpen(false);
    setEditDraft(null);
  }

  function applyAdd() {
    // 關鍵邏輯：手動新增記帳
    const newItem: ExpenseItem = {
      id: newId(),
      store: (addDraft.store || "").trim() || "(未命名)",
      amount: Number(addDraft.amount) || 0,
      date: addDraft.date || todayYmd(),
      category: normalizeCategory(addDraft.category || "其他"),
      note: (addDraft.note || "").trim(),
      createdAt: new Date().toISOString(),
    };

    const next = upsertExpense(newItem);
    setExpenses(next);
    setAddOpen(false);
    setAddDraft({
      store: "",
      amount: 0,
      date: todayYmd(),
      category: "其他",
      note: "",
    });
  }

  function handleDelete(id: string) {
    const next = deleteExpense(id);
    setExpenses(next);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-2">
            <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
              💰 AI 智慧記帳
            </h1>
            <p className="text-base text-gray-600">
              上傳/拍照收據，自動辨識並生成本月支出佔比
            </p>
          </div>
          <Badge className="gap-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-3 text-base font-semibold text-white shadow-lg">
            <Receipt className="h-5 w-5" />
            本月總支出：{formatMoney(totalThisMonth)}
          </Badge>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="border-0 bg-white/80 backdrop-blur shadow-xl transition hover:shadow-2xl lg:col-span-1">
            <CardHeader className="border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2 text-2xl text-blue-700">
                📸 上傳 / 拍照
              </CardTitle>
              <CardDescription className="text-blue-600">
                建議用手機「相機」模式拍清楚金額與店名
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelected(e.target.files?.[0] ?? null)}
              />

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => handleFileSelected(e.target.files?.[0] ?? null)}
              />

              <div className="grid grid-cols-1 gap-3">
                <Button 
                  onClick={handlePickFile} 
                  disabled={isLoading}
                  className="h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-5 w-5" />
                  )}
                  {isLoading ? '辨識中...' : '選擇圖片'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={isLoading}
                  className="h-12 border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  開啟相機（手機）
                </Button>

                <Button
                  onClick={() => setAddOpen(true)}
                  className="h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  手動新增記帳
                </Button>
              </div>

              {error ? (
                <div className="rounded-lg border-l-4 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                  <strong>❌ 辨識失敗</strong><br />{error}
                </div>
              ) : null}

              <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 text-sm text-amber-800 border border-amber-200">
                💡 <strong>提示：</strong>若 AI 金額辨識錯誤，可在下方列表按「手動修正」
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur shadow-xl transition hover:shadow-2xl lg:col-span-2">
            <CardHeader className="border-b-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-100">
              <CardTitle className="flex items-center gap-2 text-2xl text-purple-700">
                📊 本月支出佔比
              </CardTitle>
              <CardDescription className="text-purple-600">
                依類別彙總（飲食/交通/娛樂等）
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[360px] flex items-center justify-center pt-6">
              {pieData.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 text-center text-gray-500">
                  <span className="text-4xl">📭</span>
                  <span className="text-sm font-medium">尚無本月資料，先上傳一張收據試試</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(value) => formatMoney(Number(value))}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '2px solid #f59e0b',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={80}
                      outerRadius={130}
                      paddingAngle={2}
                      strokeWidth={3}
                      stroke="#fff"
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={CATEGORY_COLORS[entry.name as Category]?.pie || "#6b7280"} 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur shadow-xl lg:col-span-3">
            <CardHeader className="border-b-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-100">
              <CardTitle className="flex items-center gap-2 text-2xl text-green-700">
                📋 記帳明細
              </CardTitle>
              <CardDescription className="text-green-600">
                自動儲存於瀏覽器 LocalStorage（不會上傳你的個人資料）
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-100 to-gray-50 hover:bg-gray-100">
                      <TableHead className="font-bold text-gray-700">日期</TableHead>
                      <TableHead className="font-bold text-gray-700">店家</TableHead>
                      <TableHead className="font-bold text-gray-700">類別</TableHead>
                      <TableHead className="font-bold text-gray-700">說明</TableHead>
                      <TableHead className="text-right font-bold text-gray-700">金額</TableHead>
                      <TableHead className="text-right font-bold text-gray-700">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-400">
                            <span className="text-4xl">📭</span>
                            <span className="text-sm font-medium">尚無資料</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      expenses.map((x, idx) => (
                        <TableRow 
                          key={x.id}
                          className={`transition hover:bg-blue-50 ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          <TableCell className="whitespace-nowrap font-medium text-gray-700">
                            {x.date}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-gray-700">
                            {x.store}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={`font-semibold ${CATEGORY_COLORS[x.category]?.bg} ${CATEGORY_COLORS[x.category]?.text}`}
                            >
                              {x.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600 max-w-[150px] truncate">
                            {x.note ? x.note : <span className="text-gray-400 italic">無</span>}
                          </TableCell>
                          <TableCell className="text-right font-bold text-lg text-gray-900">
                            {formatMoney(x.amount)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                                onClick={() => openEdit(x)}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                修正
                              </Button>
                              <Button
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                                onClick={() => handleDelete(x.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                刪除
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="border-0 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-4 px-6 py-4 rounded-t-lg">
            <DialogTitle className="text-white text-2xl flex items-center gap-2">✏️ 手動修正</DialogTitle>
            <DialogDescription className="text-blue-100 text-base">
              若 AI 辨識有誤，可在這裡直接修改並保存
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="store">店家</Label>
              <Input
                id="store"
                value={editDraft?.store ?? ""}
                onChange={(e) =>
                  setEditDraft((prev) =>
                    prev ? { ...prev, store: e.target.value } : prev,
                  )
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">日期</Label>
                <Input
                  id="date"
                  type="date"
                  value={editDraft?.date ?? todayYmd()}
                  onChange={(e) =>
                    setEditDraft((prev) =>
                      prev ? { ...prev, date: e.target.value } : prev,
                    )
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">金額</Label>
                <Input
                  id="amount"
                  inputMode="numeric"
                  value={String(editDraft?.amount ?? "")}
                  onChange={(e) =>
                    setEditDraft((prev) =>
                      prev
                        ? { ...prev, amount: Number(e.target.value) || 0 }
                        : prev,
                    )
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>類別</Label>
              <Select
                value={editDraft?.category ?? "其他"}
                onValueChange={(v) =>
                  setEditDraft((prev) =>
                    prev ? { ...prev, category: v as Category } : prev,
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇類別" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-note">說明（選填）</Label>
              <Textarea
                id="edit-note"
                placeholder="例：和朋友吃飯、公務費用"
                value={editDraft?.note ?? ""}
                onChange={(e) =>
                  setEditDraft((prev) =>
                    prev ? { ...prev, note: e.target.value } : prev,
                  )
                }
                className="resize-none"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setEditOpen(false)}
              className="border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              取消
            </Button>
            <Button 
              onClick={applyEdit}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
            >
              ✅ 保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="border-0 shadow-2xl">
          <DialogHeader className="bg-gradient-to-r from-green-500 to-emerald-600 -m-6 mb-4 px-6 py-4 rounded-t-lg">
            <DialogTitle className="text-white text-2xl flex items-center gap-2">✏️ 手動新增記帳</DialogTitle>
            <DialogDescription className="text-green-100 text-base">
              直接輸入消費資訊，快速新增記錄
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="add-store">店家</Label>
              <Input
                id="add-store"
                placeholder="例：便利商店、咖啡廳"
                value={addDraft.store ?? ""}
                onChange={(e) =>
                  setAddDraft((prev) => ({ ...prev, store: e.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="add-date">日期</Label>
                <Input
                  id="add-date"
                  type="date"
                  value={addDraft.date ?? todayYmd()}
                  onChange={(e) =>
                    setAddDraft((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="add-amount">金額</Label>
                <Input
                  id="add-amount"
                  inputMode="numeric"
                  placeholder="0"
                  value={String(addDraft.amount ?? "")}
                  onChange={(e) =>
                    setAddDraft((prev) => ({
                      ...prev,
                      amount: Number(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>類別</Label>
              <Select
                value={addDraft.category ?? "其他"}
                onValueChange={(v) =>
                  setAddDraft((prev) => ({ ...prev, category: v as Category }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇類別" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="add-note">說明（選填）</Label>
              <Textarea
                id="add-note"
                placeholder="例：和朋友吃飯、公務費用"
                value={addDraft.note ?? ""}
                onChange={(e) =>
                  setAddDraft((prev) => ({ ...prev, note: e.target.value }))
                }
                className="resize-none"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button 
              variant="outline" 
              onClick={() => setAddOpen(false)}
              className="border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              取消
            </Button>
            <Button 
              onClick={applyAdd}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition"
            >
              ✅ 新增
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
