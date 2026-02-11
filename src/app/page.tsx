"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import NumberInput from "@/components/NumberInput";
import EntryCard from "@/components/EntryCard";
import WinningDisplay from "@/components/WinningDisplay";
import { getLatestWinning, getWinningNumbers } from "@/lib/data";
import { getEntries, addEntry, type LottoEntry } from "@/lib/store";

export default function HomePage() {
  const [entries, setEntries] = useState<LottoEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  const latestWinning = getLatestWinning();
  const winNums = getWinningNumbers(latestWinning);

  const loadEntries = useCallback(() => {
    setEntries(getEntries().slice(0, 3));
  }, []);

  useEffect(() => {
    setMounted(true);
    loadEntries();
  }, [loadEntries]);

  const handleSubmit = (data: {
    numbers: number[];
    round: number;
    memo: string;
    dream: string;
    amount: number;
  }) => {
    setLoading(true);
    setMessage(null);
    try {
      addEntry(data);
      setMessage({ type: "success", text: "번호가 저장되었습니다! 행운을 빌어요!" });
      loadEntries();
    } catch {
      setMessage({ type: "error", text: "저장에 실패했습니다" });
    } finally {
      setLoading(false);
    }
  };

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
        <WinningDisplay
          round={latestWinning.round}
          numbers={winNums}
          bonusNumber={latestWinning.bonusNum}
          drawDate={latestWinning.drawDate}
          prize1st={latestWinning.prize1st}
        />

        {/* Number Input */}
        <div>
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <span>&#9999;&#65039;</span> 이번 주 번호 입력
          </h3>

          {message && (
            <div
              className={`p-3 rounded-xl text-sm font-medium animate-slide-up mb-4 ${
                message.type === "success"
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-danger/10 text-danger border border-danger/20"
              }`}
            >
              {message.text}
            </div>
          )}

          <NumberInput
            onSubmit={handleSubmit}
            loading={loading}
            latestRound={latestWinning.round + 1}
          />
        </div>

        {/* Recent Entries */}
        {mounted && entries.length > 0 && (
          <div>
            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
              <span>&#128203;</span> 최근 기록
            </h3>
            <div className="space-y-3">
              {entries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  round={entry.round}
                  numbers={entry.numbers}
                  memo={entry.memo}
                  dream={entry.dream}
                  amount={entry.amount}
                  createdAt={entry.createdAt}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
