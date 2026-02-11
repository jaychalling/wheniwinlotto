import LottoBall from "./LottoBall";

interface WinningDisplayProps {
  round: number;
  numbers: number[];
  bonusNumber: number;
  drawDate: string;
  prize1st?: string | null;
  compact?: boolean;
}

export default function WinningDisplay({
  round,
  numbers,
  bonusNumber,
  drawDate,
  prize1st,
  compact = false,
}: WinningDisplayProps) {
  const date = new Date(drawDate);
  const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-primary">{round}회</span>
        <div className="flex gap-1">
          {numbers.map((num) => (
            <LottoBall key={num} number={num} size="sm" />
          ))}
          <span className="text-muted mx-0.5 flex items-center text-xs">+</span>
          <LottoBall number={bonusNumber} size="sm" bonus />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl p-5 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">
            <span className="text-primary">제 {round}회</span> 당첨번호
          </h3>
          <p className="text-xs text-muted mt-0.5">{formattedDate} 추첨</p>
        </div>
        {prize1st && (
          <div className="text-right">
            <p className="text-[10px] text-muted">1등 당첨금</p>
            <p className="text-sm font-bold text-primary">{prize1st}원</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        {numbers.map((num, i) => (
          <LottoBall key={num} number={num} size="lg" animate delay={i * 100} />
        ))}
        <span className="text-muted mx-1 text-lg font-light">+</span>
        <LottoBall number={bonusNumber} size="lg" bonus animate delay={600} />
      </div>
    </div>
  );
}
