"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LottoBall from "@/components/LottoBall";
import EntryCard from "@/components/EntryCard";
import { winningNumbers, getWinningByRound, getWinningNumbers as getWinNums } from "@/lib/data";
import { getEntries } from "@/lib/store";

function determineRank(matchCount: number, matchedBonus: boolean): string {
  if (matchCount === 6) return "1등";
  if (matchCount === 5 && matchedBonus) return "2등";
  if (matchCount === 5) return "3등";
  if (matchCount === 4) return "4등";
  if (matchCount === 3) return "5등";
  return "낙첨";
}

interface CheckResult {
  entryId: string;
  entryNumbers: number[];
  matchedNumbers: number[];
  matchedBonus: boolean;
  rank: string;
  matchCount: number;
  memo: string;
  dream: string;
}

export default function CheckPage() {
  const [selectedRound, setSelectedRound] = useState(winningNumbers[0].round);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableRounds = winningNumbers.map((w) => w.round);

  const handleCheck = () => {
    setError(null);
    setResults(null);

    const winning = getWinningByRound(selectedRound);
    if (!winning) {
      setError("해당 회차의 당첨번호가 없습니다");
      return;
    }

    const entries = getEntries().filter((e) => e.round === selectedRound);
    if (entries.length === 0) {
      setError("해당 회차에 저장된 번호가 없습니다. 홈에서 번호를 먼저 입력하세요!");
      return;
    }

    const winNums = getWinNums(winning);

    const checkResults: CheckResult[] = entries.map((entry) => {
      const matched = entry.numbers.filter((n) => winNums.includes(n));
      const matchedBonus = entry.numbers.includes(winning.bonusNum);
      return {
        entryId: entry.id,
        entryNumbers: entry.numbers,
        matchedNumbers: matched,
        matchedBonus,
        rank: determineRank(matched.length, matchedBonus),
        matchCount: matched.length,
        memo: entry.memo,
        dream: entry.dream,
      };
    });

    setResults(checkResults);
  };

  const winning = getWinningByRound(selectedRound);
  const winNums = winning ? getWinNums(winning) : [];

  const bestRank = results?.reduce((best, r) => {
    const rankOrder: Record<string, number> = { "1등": 1, "2등": 2, "3등": 3, "4등": 4, "5등": 5, "낙첨": 6 };
    return (rankOrder[r.rank] || 6) < (rankOrder[best] || 6) ? r.rank : best;
  }, "낙첨");

  return (
    <>
      <Header title="당첨 확인" showBack />
      <main className="px-4 py-5 space-y-6">
        {/* Round Selector */}
        <div className="bg-surface rounded-2xl p-5 border border-border">
          <h3 className="font-bold mb-3">회차 선택</h3>
          <div className="flex gap-2 flex-wrap">
            {availableRounds.map((round) => (
              <button
                key={round}
                onClick={() => { setSelectedRound(round); setResults(null); setError(null); }}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedRound === round
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-dim text-muted hover:bg-primary/10"
                }`}
              >
                {round}회
              </button>
            ))}
          </div>

          <button
            onClick={handleCheck}
            className="w-full mt-4 py-3 rounded-2xl font-bold gradient-gold text-white shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            제 {selectedRound}회 당첨 확인하기
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm border border-danger/20 animate-slide-up">
            {error}
          </div>
        )}

        {/* Results */}
        {results && winning && (
          <div className="space-y-5 animate-slide-up">
            {/* Winning Numbers */}
            <div className="bg-surface rounded-2xl p-5 border border-border text-center">
              <p className="text-sm text-muted mb-3">제 {selectedRound}회 당첨번호</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                {winNums.map((num, i) => (
                  <LottoBall key={num} number={num} size="lg" animate delay={i * 100} />
                ))}
                <span className="text-muted mx-1 text-lg">+</span>
                <LottoBall number={winning.bonusNum} size="lg" bonus animate delay={600} />
              </div>
            </div>

            {/* Best Result Banner */}
            <div className={`rounded-2xl p-6 text-center ${
              bestRank !== "낙첨"
                ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-primary/30"
                : "bg-surface-dim border border-border"
            }`}>
              <div className="text-4xl mb-2">
                {bestRank === "낙첨" ? "&#128546;" : bestRank === "1등" ? "&#127881;" : "&#127775;"}
              </div>
              <h2 className={`text-2xl font-bold mb-1 ${bestRank !== "낙첨" ? "text-primary" : "text-muted"}`}>
                {bestRank !== "낙첨" ? `축하합니다! ${bestRank}!` : "다음 기회에..."}
              </h2>
              <p className="text-sm text-muted">
                {bestRank !== "낙첨"
                  ? "번호가 맞았어요! 당첨을 확인하세요."
                  : "포기하지 마세요, 다음번엔 행운이 찾아올 거예요!"}
              </p>
            </div>

            {/* Individual Results */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm">내 번호 결과</h3>
              {results.map((r) => (
                <EntryCard
                  key={r.entryId}
                  round={selectedRound}
                  numbers={r.entryNumbers}
                  amount={0}
                  createdAt={winning.drawDate}
                  matchedNumbers={r.matchedNumbers}
                  rank={r.rank}
                  memo={r.memo}
                  dream={r.dream}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && !error && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4 animate-float">&#127942;</div>
            <p className="text-muted text-sm">회차를 선택하고 당첨 여부를 확인해보세요!</p>
          </div>
        )}
      </main>
    </>
  );
}
