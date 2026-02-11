import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";
import WinningDisplay from "@/components/WinningDisplay";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const latestWinning = await prisma.winningNumber.findFirst({
    orderBy: { round: "desc" },
  });

  const recentEntries = await prisma.lottoEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      <Header title="로또 일기" />
      <main className="px-4 py-5 space-y-6">
        {/* Hero Section */}
        <div className="gradient-dream rounded-3xl p-6 text-center">
          <div className="text-4xl mb-2 animate-float">&#127808;</div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            오늘의 행운을 기록하세요
          </h2>
          <p className="text-sm text-muted">
            당신의 로또 번호에 꿈과 감성을 담아보세요
          </p>
        </div>

        {/* Latest Winning Numbers */}
        {latestWinning && (
          <WinningDisplay
            round={latestWinning.round}
            numbers={[
              latestWinning.num1,
              latestWinning.num2,
              latestWinning.num3,
              latestWinning.num4,
              latestWinning.num5,
              latestWinning.num6,
            ]}
            bonusNumber={latestWinning.bonusNum}
            drawDate={latestWinning.drawDate.toISOString()}
            prize1st={latestWinning.prize1st}
          />
        )}

        {/* Number Input */}
        <div>
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <span>&#9999;&#65039;</span> 이번 주 번호 입력
          </h3>
          <HomeClient
            latestRound={latestWinning ? latestWinning.round + 1 : 1155}
            recentEntries={recentEntries.map((e) => ({
              id: e.id,
              round: e.round,
              numbers: [e.num1, e.num2, e.num3, e.num4, e.num5, e.num6],
              memo: e.memo,
              dream: e.dream,
              amount: e.amount,
              createdAt: e.createdAt.toISOString(),
            }))}
          />
        </div>
      </main>
    </>
  );
}
