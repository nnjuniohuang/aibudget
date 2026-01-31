import type { ExpenseItem } from "@/lib/types";

const STORAGE_KEY = "aibudget.expenses.v1";

export function loadExpenses(): ExpenseItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ExpenseItem[];
  } catch {
    return [];
  }
}

export function saveExpenses(items: ExpenseItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function upsertExpense(item: ExpenseItem) {
  const current = loadExpenses();
  const next = current.some((x) => x.id === item.id)
    ? current.map((x) => (x.id === item.id ? item : x))
    : [item, ...current];
  saveExpenses(next);
  return next;
}

export function deleteExpense(id: string) {
  const current = loadExpenses();
  const next = current.filter((x) => x.id !== id);
  saveExpenses(next);
  return next;
}
