import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.lottoEntry.findMany({
      select: { amount: true, round: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const totalSpent = entries.reduce((sum, e) => sum + e.amount, 0);
    const totalEntries = entries.length;
    const roundsPlayed = new Set(entries.map((e) => e.round)).size;

    const monthlyData: Record<string, number> = {};
    for (const entry of entries) {
      const month = entry.createdAt.toISOString().slice(0, 7);
      monthlyData[month] = (monthlyData[month] || 0) + entry.amount;
    }

    return NextResponse.json({
      totalSpent,
      totalEntries,
      roundsPlayed,
      monthlyData,
    });
  } catch (error) {
    console.error("Failed to fetch savings:", error);
    return NextResponse.json(
      { error: "Failed to fetch savings" },
      { status: 500 }
    );
  }
}
