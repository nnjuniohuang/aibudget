export function todayYmd() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function isSameMonth(ymd: string, ref: Date) {
  // 關鍵邏輯：以 YYYY-MM-DD 字串判斷是否屬於指定月份
  const [y, m] = ymd.split("-").map((x) => Number(x));
  if (!y || !m) return false;
  return y === ref.getFullYear() && m === ref.getMonth() + 1;
}
