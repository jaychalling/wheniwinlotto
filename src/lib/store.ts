export interface LottoEntry {
  id: string;
  round: number;
  numbers: number[];
  memo: string;
  dream: string;
  amount: number;
  createdAt: string;
}

export interface WishItem {
  id: string;
  title: string;
  estimatedCost: number | null;
  priority: number;
  completed: boolean;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Lotto Entries
export function getEntries(): LottoEntry[] {
  return getFromStorage<LottoEntry[]>("lotto-entries", []);
}

export function addEntry(data: {
  round: number;
  numbers: number[];
  memo: string;
  dream: string;
  amount: number;
}): LottoEntry {
  const entries = getEntries();
  const entry: LottoEntry = {
    id: generateId(),
    round: data.round,
    numbers: data.numbers,
    memo: data.memo,
    dream: data.dream,
    amount: data.amount,
    createdAt: new Date().toISOString(),
  };
  entries.unshift(entry);
  saveToStorage("lotto-entries", entries);
  return entry;
}

export function deleteEntry(id: string): void {
  const entries = getEntries().filter((e) => e.id !== id);
  saveToStorage("lotto-entries", entries);
}

// Wishlist
const defaultWishlist: WishItem[] = [
  { id: "w1", title: "제주도 한달살기", estimatedCost: 5000000, priority: 1, completed: false },
  { id: "w2", title: "부모님 효도여행", estimatedCost: 10000000, priority: 2, completed: false },
  { id: "w3", title: "전세 보증금", estimatedCost: 300000000, priority: 3, completed: false },
  { id: "w4", title: "테슬라 모델 3", estimatedCost: 60000000, priority: 4, completed: false },
  { id: "w5", title: "카페 창업", estimatedCost: 100000000, priority: 5, completed: false },
];

export function getWishlist(): WishItem[] {
  const items = getFromStorage<WishItem[] | null>("lotto-wishlist", null);
  if (items === null) {
    saveToStorage("lotto-wishlist", defaultWishlist);
    return defaultWishlist;
  }
  return items;
}

export function addWishItem(title: string, estimatedCost: number | null): WishItem {
  const items = getWishlist();
  const item: WishItem = {
    id: generateId(),
    title,
    estimatedCost,
    priority: items.length + 1,
    completed: false,
  };
  items.push(item);
  saveToStorage("lotto-wishlist", items);
  return item;
}

export function deleteWishItem(id: string): void {
  const items = getWishlist().filter((w) => w.id !== id);
  saveToStorage("lotto-wishlist", items);
}
