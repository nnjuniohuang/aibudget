export type Category = "飲食" | "交通" | "娛樂" | "購物" | "日用品" | "醫療" | "其他";

export type ExpenseItem = {
  id: string;
  store: string;
  amount: number;
  date: string; // YYYY-MM-DD
  category: Category;
  note?: string; // 新增備註欄位
  createdAt: string; // ISO
};

// 類別顏色映射
export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; pie: string }> = {
  飲食: { bg: "bg-orange-100", text: "text-orange-700", pie: "#f97316" },
  交通: { bg: "bg-blue-100", text: "text-blue-700", pie: "#3b82f6" },
  娛樂: { bg: "bg-pink-100", text: "text-pink-700", pie: "#ec4899" },
  購物: { bg: "bg-purple-100", text: "text-purple-700", pie: "#a855f7" },
  日用品: { bg: "bg-green-100", text: "text-green-700", pie: "#10b981" },
  醫療: { bg: "bg-red-100", text: "text-red-700", pie: "#ef4444" },
  其他: { bg: "bg-gray-100", text: "text-gray-700", pie: "#6b7280" },
};
