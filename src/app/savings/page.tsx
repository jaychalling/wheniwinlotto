"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { getEntries, getWishlist, addWishItem, deleteWishItem, type WishItem } from "@/lib/store";

export default function SavingsPage() {
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [wishlist, setWishlist] = useState<WishItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCost, setNewCost] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  const loadData = useCallback(() => {
    const entries = getEntries();
    setTotalSpent(entries.reduce((sum, e) => sum + e.amount, 0));
    setTotalEntries(entries.length);
    setRoundsPlayed(new Set(entries.map((e) => e.round)).size);
    setWishlist(getWishlist());
  }, []);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [loadData]);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addWishItem(newTitle, newCost ? parseInt(newCost) : null);
    setNewTitle("");
    setNewCost("");
    setShowForm(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    deleteWishItem(id);
    loadData();
  };

  const totalWishCost = wishlist.reduce((sum, w) => sum + (w.estimatedCost || 0), 0);

  return (
    <>
      <Header title="희망 저금통" showBack />
      <main className="px-4 py-5 space-y-6">
        {/* Piggy Bank Hero */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 text-center border border-primary/10">
          <div className="text-5xl mb-3 animate-float">&#128176;</div>
          <p className="text-xs text-muted mb-1">지금까지 투자한 금액</p>
          <p className="text-3xl font-bold text-primary">
            {mounted ? totalSpent.toLocaleString() : "0"}<span className="text-base text-muted ml-1">원</span>
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <div>
              <p className="text-lg font-bold text-foreground">{mounted ? totalEntries : 0}</p>
              <p className="text-[10px] text-muted">총 기록</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-lg font-bold text-foreground">{mounted ? roundsPlayed : 0}</p>
              <p className="text-[10px] text-muted">참여 회차</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-lg font-bold text-foreground">
                {mounted && totalEntries > 0 ? Math.round(totalSpent / totalEntries).toLocaleString() : 0}
              </p>
              <p className="text-[10px] text-muted">회당 평균(원)</p>
            </div>
          </div>
        </div>

        {/* Wishlist */}
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

          {mounted && wishlist.length === 0 ? (
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
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-danger/10 text-danger hover:bg-danger/20 transition-colors flex-shrink-0"
                    aria-label="삭제"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {mounted && totalWishCost > 0 && (
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
      </main>
    </>
  );
}
