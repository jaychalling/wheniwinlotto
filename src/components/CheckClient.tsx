"use client";

import { useState } from "react";
import LottoBall from "./LottoBall";
import EntryCard from "./EntryCard";

interface CheckResult {
  entryId: string;
  round: number;
  entryNumbers: number[];
  winningNumbers: number[];
  bonusNumber: number;
  matchedNumbers: number[];
  matchedBonus: boolean;
  rank: string;
  matchCount: number;
}

interface CheckResponse {
  round: number;
  drawDate: string;
  prize1st: string;
  winningNumbers: number[];
  bonusNumber: number;
  results: CheckResult[];
}

interface CheckClientProps {
  availableRounds: number[];
}

export default function CheckClient({ availableRounds }: CheckClientProps) {
  const [selectedRound, setSelectedRound] = useState(availableRounds[0] || 0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ round: selectedRound }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "확인에 실패했습니다");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "확인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const bestRank = result?.results?.reduce((best, r) => {
    const rankOrder: Record<string, number> = { "1등": 1, "2등": 2, "3등": 3, "4등": 4, "5등": 5, "낙첨": 6 };
    return (rankOrder[r.rank] || 6) < (rankOrder[best] || 6) ? r.rank : best;
  }, "낙첨");

  return (
    <div className="space-y-6">
      {/* Round Selector */}
      <div className="bg-surface rounded-2xl p-5 border border-border">
        <h3 className="font-bold mb-3">회차 선택</h3>
        <div className="flex gap-2 flex-wrap">
          {availableRounds.map((round) => (
            <button
              key={round}
              onClick={() => setSelectedRound(round)}
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
          disabled={loading || !selectedRound}
          className="w-full mt-4 py-3 rounded-2xl font-bold gradient-gold text-white shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          {loading ? "확인 중..." : `제 ${selectedRound}회 당첨 확인하기`}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-xl bg-danger/10 text-danger text-sm border border-danger/20 animate-slide-up">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-5 animate-slide-up">
          {/* Winning Numbers */}
          <div className="bg-surface rounded-2xl p-5 border border-border text-center">
            <p className="text-sm text-muted mb-3">제 {result.round}회 당첨번호</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              {result.winningNumbers.map((num, i) => (
                <LottoBall key={num} number={num} size="lg" animate delay={i * 100} />
              ))}
              <span className="text-muted mx-1 text-lg">+</span>
              <LottoBall number={result.bonusNumber} size="lg" bonus animate delay={600} />
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
            {result.results.map((r) => (
              <EntryCard
                key={r.entryId}
                round={r.round}
                numbers={r.entryNumbers}
                amount={0}
                createdAt={result.drawDate}
                matchedNumbers={r.matchedNumbers}
                rank={r.rank}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !error && !loading && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 animate-float">&#127942;</div>
          <p className="text-muted text-sm">회차를 선택하고 당첨 여부를 확인해보세요!</p>
        </div>
      )}
    </div>
  );
}
