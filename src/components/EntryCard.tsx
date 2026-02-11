import LottoBall from "./LottoBall";

interface EntryCardProps {
  round: number;
  numbers: number[];
  memo?: string | null;
  dream?: string | null;
  amount: number;
  createdAt: string;
  matchedNumbers?: number[];
  rank?: string;
}

export default function EntryCard({
  round,
  numbers,
  memo,
  dream,
  amount,
  createdAt,
  matchedNumbers,
  rank,
}: EntryCardProps) {
  const date = new Date(createdAt);
  const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  const getRankStyle = (r: string) => {
    switch (r) {
      case "1등": return "bg-gradient-to-r from-yellow-400 to-amber-500 text-white";
      case "2등": return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
      case "3등": return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
      case "4등": return "bg-blue-100 text-blue-700";
      case "5등": return "bg-green-100 text-green-700";
      default: return "bg-surface-dim text-muted";
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-4 border border-border hover:shadow-md transition-shadow animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
            {round}회
          </span>
          <span className="text-xs text-muted">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          {rank && (
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${getRankStyle(rank)}`}>
              {rank}
            </span>
          )}
          <span className="text-xs text-muted">{amount.toLocaleString()}원</span>
        </div>
      </div>

      <div className="flex gap-1.5 justify-center mb-3">
        {numbers.map((num) => (
          <LottoBall
            key={num}
            number={num}
            size="md"
            highlighted={matchedNumbers?.includes(num)}
          />
        ))}
      </div>

      {(memo || dream) && (
        <div className="space-y-1 pt-2 border-t border-border/50">
          {memo && (
            <p className="text-xs text-foreground/70">
              <span className="text-muted mr-1">메모</span> {memo}
            </p>
          )}
          {dream && (
            <p className="text-xs text-secondary/80">
              <span className="text-muted mr-1">꿈</span> {dream}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
