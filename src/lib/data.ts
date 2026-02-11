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

// Sample data - actual winning numbers may differ
export const winningNumbers: WinningNumberData[] = [
  { round: 1160, num1: 2, num2: 11, num3: 18, num4: 25, num5: 33, num6: 44, bonusNum: 7, drawDate: "2026-02-21", prize1st: "2,034,567,000" },
  { round: 1159, num1: 5, num2: 9, num3: 16, num4: 28, num5: 37, num6: 43, bonusNum: 22, drawDate: "2026-02-14", prize1st: "1,923,456,000" },
  { round: 1158, num1: 3, num2: 14, num3: 22, num4: 31, num5: 38, num6: 45, bonusNum: 10, drawDate: "2026-02-07", prize1st: "2,267,891,000" },
  { round: 1157, num1: 6, num2: 12, num3: 19, num4: 27, num5: 35, num6: 41, bonusNum: 4, drawDate: "2026-01-31", prize1st: "1,845,723,000" },
  { round: 1156, num1: 1, num2: 10, num3: 23, num4: 29, num5: 36, num6: 42, bonusNum: 15, drawDate: "2026-01-24", prize1st: "2,156,348,000" },
  { round: 1155, num1: 8, num2: 17, num3: 24, num4: 30, num5: 39, num6: 44, bonusNum: 13, drawDate: "2026-01-17", prize1st: "1,978,234,000" },
  { round: 1154, num1: 4, num2: 8, num3: 22, num4: 26, num5: 32, num6: 38, bonusNum: 27, drawDate: "2025-01-11", prize1st: "2,145,832,000" },
  { round: 1153, num1: 3, num2: 13, num3: 20, num4: 29, num5: 37, num6: 44, bonusNum: 9, drawDate: "2025-01-04", prize1st: "1,987,654,000" },
  { round: 1152, num1: 1, num2: 6, num3: 12, num4: 21, num5: 36, num6: 40, bonusNum: 18, drawDate: "2024-12-28", prize1st: "2,312,487,000" },
  { round: 1151, num1: 7, num2: 13, num3: 19, num4: 30, num5: 34, num6: 42, bonusNum: 25, drawDate: "2024-12-21", prize1st: "1,856,923,000" },
  { round: 1150, num1: 5, num2: 8, num3: 23, num4: 24, num5: 35, num6: 41, bonusNum: 31, drawDate: "2024-12-14", prize1st: "2,478,156,000" },
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
