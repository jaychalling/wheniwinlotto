"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface WishItem {
  id: string;
  title: string;
  estimatedCost: number | null;
  priority: number;
  completed: boolean;
}

interface SavingsClientProps {
  initialWishlist: WishItem[];
  totalSpent: number;
}

export default function SavingsClient({ initialWishlist, totalSpent }: SavingsClientProps) {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [newTitle, setNewTitle] = useState("");
  const [newCost, setNewCost] = useState("");
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleAdd = async () => {
    if (!newTitle.trim()) return;

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          estimatedCost: newCost ? parseInt(newCost) : null,
          priority: wishlist.length + 1,
        }),
      });

      if (res.ok) {
        const item = await res.json();
        setWishlist([...wishlist, item]);
        setNewTitle("");
        setNewCost("");
        setShowForm(false);
        router.refresh();
      }
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/wishlist?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setWishlist(wishlist.filter((w) => w.id !== id));
        router.refresh();
      }
    } catch {
      // silently fail
    }
  };

  const totalWishCost = wishlist.reduce((sum, w) => sum + (w.estimatedCost || 0), 0);

  return (
    <div className="space-y-5">
      {/* What if I win? */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base flex items-center gap-2">
            <span>&#11088;</span> 당첨되면 뭐 할래?
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors font-medium"
          >
            {showForm ? "취소" : "+ 추가"}
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-surface rounded-2xl p-4 border border-border mb-3 animate-slide-up">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="당첨되면 하고 싶은 것..."
              className="w-full px-3 py-2.5 bg-surface-dim rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                placeholder="예상 비용 (원)"
                className="flex-1 px-3 py-2.5 bg-surface-dim rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={handleAdd}
                disabled={!newTitle.trim()}
                className="px-4 py-2.5 gradient-gold text-white rounded-xl text-sm font-medium disabled:opacity-50"
              >
                추가
              </button>
            </div>
          </div>
        )}

        {/* Wish List */}
        {wishlist.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">&#128173;</div>
            <p className="text-muted text-sm">아직 꿈 목록이 비어있어요</p>
          </div>
        ) : (
          <div className="space-y-2">
            {wishlist.map((wish, index) => (
              <div
                key={wish.id}
                className="bg-surface rounded-2xl p-4 border border-border flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{wish.title}</p>
                  {wish.estimatedCost && (
                    <p className="text-xs text-muted">{wish.estimatedCost.toLocaleString()}원</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(wish.id)}
                  className="text-muted hover:text-danger transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 01.78.72l.5 6a.75.75 0 01-1.499.12l-.5-6a.75.75 0 01.72-.78zm3.62.72a.75.75 0 00-1.5-.12l-.5 6a.75.75 0 101.5.12l.5-6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {totalWishCost > 0 && (
        <div className="bg-surface-dim rounded-2xl p-4 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted">꿈 목록 총 비용</span>
            <span className="font-bold text-primary">{totalWishCost.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted">현재까지 투자</span>
            <span className="font-bold text-accent">{totalSpent.toLocaleString()}원</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full gradient-gold rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalSpent / totalWishCost) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-muted mt-1.5 text-right">
            꿈까지 {Math.max(0, totalWishCost - totalSpent).toLocaleString()}원 남음
          </p>
        </div>
      )}
    </div>
  );
}
