import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latest = searchParams.get("latest");

  try {
    if (latest === "true") {
      const winning = await prisma.winningNumber.findFirst({
        orderBy: { round: "desc" },
      });
      return NextResponse.json(winning);
    }

    const winningNumbers = await prisma.winningNumber.findMany({
      orderBy: { round: "desc" },
    });
    return NextResponse.json(winningNumbers);
  } catch (error) {
    console.error("Failed to fetch winning numbers:", error);
    return NextResponse.json(
      { error: "Failed to fetch winning numbers" },
      { status: 500 }
    );
  }
}
