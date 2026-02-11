"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NumberInput from "./NumberInput";
import EntryCard from "./EntryCard";

interface RecentEntry {
  id: string;
  round: number;
  numbers: number[];
  memo: string | null;
  dream: string | null;
  amount: number;
  createdAt: string;
}

interface HomeClientProps {
  latestRound: number;
  recentEntries: RecentEntry[];
}

export default function HomeClient({ latestRound, recentEntries }: HomeClientProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: {
    numbers: number[];
    round: number;
    memo: string;
    dream: string;
    amount: number;
  }) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          round: data.round,
          num1: data.numbers[0],
          num2: data.numbers[1],
          num3: data.numbers[2],
          num4: data.numbers[3],
          num5: data.numbers[4],
          num6: data.numbers[5],
          memo: data.memo,
          dream: data.dream,
          amount: data.amount,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "저장에 실패했습니다");
      }

      setMessage({ type: "success", text: "번호가 저장되었습니다! 행운을 빌어요!" });
      router.refresh();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "저장에 실패했습니다",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-3 rounded-xl text-sm font-medium animate-slide-up ${
            message.type === "success"
              ? "bg-success/10 text-success border border-success/20"
              : "bg-danger/10 text-danger border border-danger/20"
          }`}
        >
          {message.text}
        </div>
      )}

      <NumberInput onSubmit={handleSubmit} loading={loading} latestRound={latestRound} />

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <div>
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <span>&#128203;</span> 최근 기록
          </h3>
          <div className="space-y-3">
            {recentEntries.map((entry) => (
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
    </div>
  );
}
