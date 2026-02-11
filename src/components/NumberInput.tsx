"use client";

import { useState, useCallback } from "react";
import LottoBall from "./LottoBall";

interface NumberInputProps {
  onSubmit: (data: {
    numbers: number[];
    round: number;
    memo: string;
    dream: string;
    amount: number;
  }) => void;
  loading?: boolean;
  latestRound?: number;
}

export default function NumberInput({ onSubmit, loading = false, latestRound = 1155 }: NumberInputProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [round, setRound] = useState(latestRound);
  const [memo, setMemo] = useState("");
  const [dream, setDream] = useState("");
  const [amount, setAmount] = useState(1000);

  const toggleNumber = useCallback((num: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      }
      if (prev.length >= 6) return prev;
      return [...prev, num].sort((a, b) => a - b);
    });
  }, []);

  const handleRandomPick = () => {
    const nums: number[] = [];
    while (nums.length < 6) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    setSelectedNumbers(nums.sort((a, b) => a - b));
  };

  const handleReset = () => {
    setSelectedNumbers([]);
  };

  const handleSubmit = () => {
    if (selectedNumbers.length !== 6) return;
    onSubmit({
      numbers: selectedNumbers,
      round,
      memo,
      dream,
      amount,
    });
    setSelectedNumbers([]);
    setMemo("");
    setDream("");
  };

  return (
    <div className="space-y-5">
      {/* Round Input */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted whitespace-nowrap">회차</label>
        <div className="flex items-center gap-2 bg-surface-dim rounded-xl px-3 py-2">
          <span className="text-primary font-bold">제</span>
          <input
            type="number"
            value={round}
            onChange={(e) => setRound(parseInt(e.target.value) || 0)}
            className="w-20 bg-transparent text-center font-bold text-lg focus:outline-none"
          />
          <span className="text-primary font-bold">회</span>
        </div>
      </div>

      {/* Selected Numbers Display */}
      <div className="bg-surface rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted">내 번호 ({selectedNumbers.length}/6)</span>
          <div className="flex gap-2">
            <button
              onClick={handleRandomPick}
              className="text-xs px-3 py-1.5 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors font-medium"
            >
              자동 선택
            </button>
            <button
              onClick={handleReset}
              className="text-xs px-3 py-1.5 bg-danger/10 text-danger rounded-full hover:bg-danger/20 transition-colors font-medium"
            >
              초기화
            </button>
          </div>
        </div>
        <div className="flex gap-2 justify-center min-h-[52px] items-center">
          {selectedNumbers.length === 0 ? (
            <p className="text-muted text-sm">아래에서 번호를 선택하세요</p>
          ) : (
            selectedNumbers.map((num, i) => (
              <LottoBall key={num} number={num} size="lg" animate delay={i * 80} />
            ))
          )}
        </div>
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-9 gap-1.5">
        {Array.from({ length: 45 }, (_, i) => i + 1).map((num) => {
          const isSelected = selectedNumbers.includes(num);
          const isDisabled = !isSelected && selectedNumbers.length >= 6;
          return (
            <button
              key={num}
              onClick={() => toggleNumber(num)}
              disabled={isDisabled}
              className={`
                w-full aspect-square rounded-full text-xs font-bold
                flex items-center justify-center transition-all duration-150
                ${isSelected
                  ? "bg-primary text-white shadow-md scale-110"
                  : isDisabled
                    ? "bg-surface-dim text-muted/40 cursor-not-allowed"
                    : "bg-surface-dim text-foreground hover:bg-primary/20 hover:scale-105 active:scale-95"
                }
              `}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* Memo & Dream */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-muted block mb-1">메모</label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="이번 번호에 대한 한마디..."
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted block mb-1">어젯밤 꿈</label>
          <input
            type="text"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="꿈에서 본 것이 있다면..."
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted block mb-1">구매 금액</label>
          <div className="flex gap-2">
            {[1000, 3000, 5000, 10000].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(v)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  amount === v
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-dim text-muted hover:bg-primary/10"
                }`}
              >
                {v.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={selectedNumbers.length !== 6 || loading}
        className={`
          w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200
          ${selectedNumbers.length === 6
            ? "gradient-gold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            : "bg-surface-dim text-muted cursor-not-allowed"
          }
        `}
      >
        {loading ? "저장 중..." : "번호 저장하기"}
      </button>
    </div>
  );
}
