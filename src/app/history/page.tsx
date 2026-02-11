import Header from "@/components/Header";
import EntryCard from "@/components/EntryCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const entries = await prisma.lottoEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalSpent = entries.reduce((sum, e) => sum + e.amount, 0);
  const roundsPlayed = new Set(entries.map((e) => e.round)).size;

  return (
    <>
      <Header title="내 기록" showBack />
      <main className="px-4 py-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-surface rounded-2xl p-3 border border-border text-center">
            <p className="text-2xl font-bold text-primary">{entries.length}</p>
            <p className="text-[10px] text-muted mt-0.5">총 기록</p>
          </div>
          <div className="bg-surface rounded-2xl p-3 border border-border text-center">
            <p className="text-2xl font-bold text-secondary">{roundsPlayed}</p>
            <p className="text-[10px] text-muted mt-0.5">참여 회차</p>
          </div>
          <div className="bg-surface rounded-2xl p-3 border border-border text-center">
            <p className="text-lg font-bold text-accent">{totalSpent.toLocaleString()}</p>
            <p className="text-[10px] text-muted mt-0.5">총 투자(원)</p>
          </div>
        </div>

        {/* Timeline */}
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#128221;</div>
            <p className="text-muted text-sm">아직 기록이 없어요</p>
            <p className="text-muted text-xs mt-1">홈에서 번호를 입력해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <EntryCard
                  round={entry.round}
                  numbers={[entry.num1, entry.num2, entry.num3, entry.num4, entry.num5, entry.num6]}
                  memo={entry.memo}
                  dream={entry.dream}
                  amount={entry.amount}
                  createdAt={entry.createdAt.toISOString()}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
