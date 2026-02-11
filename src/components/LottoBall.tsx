"use client";

interface LottoBallProps {
  number: number;
  size?: "sm" | "md" | "lg";
  highlighted?: boolean;
  bonus?: boolean;
  delay?: number;
  animate?: boolean;
}

function getBallColor(num: number): string {
  if (num >= 1 && num <= 10) return "bg-ball-yellow text-amber-900";
  if (num >= 11 && num <= 20) return "bg-ball-blue text-blue-900";
  if (num >= 21 && num <= 30) return "bg-ball-red text-white";
  if (num >= 31 && num <= 40) return "bg-ball-gray text-gray-800";
  return "bg-ball-green text-green-900";
}

function getShadowColor(num: number): string {
  if (num >= 1 && num <= 10) return "shadow-yellow-400/40";
  if (num >= 11 && num <= 20) return "shadow-blue-400/40";
  if (num >= 21 && num <= 30) return "shadow-red-400/40";
  if (num >= 31 && num <= 40) return "shadow-gray-400/40";
  return "shadow-green-400/40";
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-11 h-11 text-sm",
  lg: "w-14 h-14 text-lg",
};

export default function LottoBall({
  number,
  size = "md",
  highlighted = false,
  bonus = false,
  delay = 0,
  animate = false,
}: LottoBallProps) {
  const colorClass = getBallColor(number);
  const shadowClass = getShadowColor(number);
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`
        ${sizeClass} ${colorClass}
        rounded-full flex items-center justify-center font-bold
        shadow-md ${shadowClass}
        ${highlighted ? "ring-2 ring-primary ring-offset-2" : ""}
        ${bonus ? "ring-2 ring-accent ring-offset-1" : ""}
        ${animate ? "animate-pop-in" : ""}
        transition-all duration-200 hover:scale-110
        relative overflow-hidden
      `}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
      <span className="relative z-10">{number}</span>
    </div>
  );
}
