import Header from "@/components/Header";
import SavingsClient from "@/components/SavingsClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SavingsPage() {
  const entries = await prisma.lottoEntry.findMany({
    select: { amount: true, round: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const wishlist = await prisma.wishListItem.findMany({
    orderBy: { priority: "asc" },
  });

  const totalSpent = entries.reduce((sum, e) => sum + e.amount, 0);
  const totalEntries = entries.length;
  const roundsPlayed = new Set(entries.map((e) => e.round)).size;

  return (
    <>
      <Header title="희망 저금통" showBack />
      <main className="px-4 py-5 space-y-6">
        {/* Piggy Bank Hero */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 text-center border border-primary/10">
          <div className="text-5xl mb-3 animate-float">&#128176;</div>
          <p className="text-xs text-muted mb-1">지금까지 투자한 금액</p>
          <p className="text-3xl font-bold text-primary">
            {totalSpent.toLocaleString()}<span className="text-base text-muted ml-1">원</span>
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <div>
              <p className="text-lg font-bold text-foreground">{totalEntries}</p>
              <p className="text-[10px] text-muted">총 기록</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-lg font-bold text-foreground">{roundsPlayed}</p>
              <p className="text-[10px] text-muted">참여 회차</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-lg font-bold text-foreground">
                {totalEntries > 0 ? Math.round(totalSpent / totalEntries).toLocaleString() : 0}
              </p>
              <p className="text-[10px] text-muted">회당 평균(원)</p>
            </div>
          </div>
        </div>

        {/* Wishlist */}
        <SavingsClient
          initialWishlist={wishlist.map((w) => ({
            id: w.id,
            title: w.title,
            estimatedCost: w.estimatedCost,
            priority: w.priority,
            completed: w.completed,
          }))}
          totalSpent={totalSpent}
        />
      </main>
    </>
  );
}
