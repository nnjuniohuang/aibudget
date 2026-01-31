import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
  "飲食",
  "交通",
  "娛樂",
  "購物",
  "日用品",
  "醫療",
  "其他",
];

export function normalizeCategory(input: string): Category {
  const found = CATEGORIES.find((c) => c === input);
  return found ?? "其他";
}
