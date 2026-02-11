export interface WinningNumberData {
  round: number;
  num1: number;
  num2: number;
  num3: number;
  num4: number;
  num5: number;
  num6: number;
  bonusNum: number;
  drawDate: string;
  prize1st: string;
}

export const winningNumbers: WinningNumberData[] = [
  { round: 1154, num1: 3, num2: 12, num3: 18, num4: 26, num5: 33, num6: 45, bonusNum: 7, drawDate: "2025-02-01", prize1st: "2,430,000,000" },
  { round: 1153, num1: 5, num2: 11, num3: 16, num4: 28, num5: 36, num6: 42, bonusNum: 20, drawDate: "2025-01-25", prize1st: "1,890,000,000" },
  { round: 1152, num1: 2, num2: 8, num3: 19, num4: 25, num5: 39, num6: 44, bonusNum: 15, drawDate: "2025-01-18", prize1st: "2,150,000,000" },
  { round: 1151, num1: 7, num2: 14, num3: 22, num4: 30, num5: 37, num6: 43, bonusNum: 9, drawDate: "2025-01-11", prize1st: "1,750,000,000" },
  { round: 1150, num1: 1, num2: 10, num3: 21, num4: 29, num5: 34, num6: 41, bonusNum: 17, drawDate: "2025-01-04", prize1st: "2,680,000,000" },
  { round: 1149, num1: 4, num2: 13, num3: 20, num4: 27, num5: 35, num6: 40, bonusNum: 23, drawDate: "2024-12-28", prize1st: "1,920,000,000" },
  { round: 1148, num1: 6, num2: 15, num3: 23, num4: 31, num5: 38, num6: 44, bonusNum: 11, drawDate: "2024-12-21", prize1st: "2,310,000,000" },
  { round: 1147, num1: 9, num2: 17, num3: 24, num4: 32, num5: 36, num6: 42, bonusNum: 5, drawDate: "2024-12-14", prize1st: "1,560,000,000" },
  { round: 1146, num1: 3, num2: 11, num3: 19, num4: 28, num5: 33, num6: 45, bonusNum: 14, drawDate: "2024-12-07", prize1st: "2,050,000,000" },
  { round: 1145, num1: 8, num2: 16, num3: 22, num4: 29, num5: 37, num6: 43, bonusNum: 2, drawDate: "2024-11-30", prize1st: "1,840,000,000" },
];

export function getLatestWinning(): WinningNumberData {
  return winningNumbers[0];
}

export function getWinningByRound(round: number): WinningNumberData | undefined {
  return winningNumbers.find((w) => w.round === round);
}

export function getWinningNumbers(nums: WinningNumberData): number[] {
  return [nums.num1, nums.num2, nums.num3, nums.num4, nums.num5, nums.num6];
}
