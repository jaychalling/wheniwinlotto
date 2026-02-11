import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

function determineRank(matchCount: number, matchedBonus: boolean): string {
  if (matchCount === 6) return "1등";
  if (matchCount === 5 && matchedBonus) return "2등";
  if (matchCount === 5) return "3등";
  if (matchCount === 4) return "4등";
  if (matchCount === 3) return "5등";
  return "낙첨";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { round } = body;

    if (!round) {
      return NextResponse.json(
        { error: "회차 번호가 필요합니다" },
        { status: 400 }
      );
    }

    const winningNumber = await prisma.winningNumber.findUnique({
      where: { round },
    });

    if (!winningNumber) {
      return NextResponse.json(
        { error: "해당 회차의 당첨번호가 없습니다" },
        { status: 404 }
      );
    }

    const entries = await prisma.lottoEntry.findMany({
      where: { round },
    });

    if (entries.length === 0) {
      return NextResponse.json(
        { error: "해당 회차에 저장된 번호가 없습니다" },
        { status: 404 }
      );
    }

    const winNums = [
      winningNumber.num1,
      winningNumber.num2,
      winningNumber.num3,
      winningNumber.num4,
      winningNumber.num5,
      winningNumber.num6,
    ];

    const results: CheckResult[] = entries.map((entry) => {
      const entryNums = [
        entry.num1,
        entry.num2,
        entry.num3,
        entry.num4,
        entry.num5,
        entry.num6,
      ];
      const matched = entryNums.filter((n) => winNums.includes(n));
      const matchedBonus = entryNums.includes(winningNumber.bonusNum);

      return {
        entryId: entry.id,
        round: entry.round,
        entryNumbers: entryNums,
        winningNumbers: winNums,
        bonusNumber: winningNumber.bonusNum,
        matchedNumbers: matched,
        matchedBonus,
        rank: determineRank(matched.length, matchedBonus),
        matchCount: matched.length,
      };
    });

    return NextResponse.json({
      round,
      drawDate: winningNumber.drawDate,
      prize1st: winningNumber.prize1st,
      winningNumbers: winNums,
      bonusNumber: winningNumber.bonusNum,
      results,
    });
  } catch (error) {
    console.error("Failed to check numbers:", error);
    return NextResponse.json(
      { error: "Failed to check numbers" },
      { status: 500 }
    );
  }
}
