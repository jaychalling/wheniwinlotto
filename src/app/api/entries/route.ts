import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  try {
    const [entries, total] = await Promise.all([
      prisma.lottoEntry.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lottoEntry.count(),
    ]);

    return NextResponse.json({ entries, total, page, limit });
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { round, num1, num2, num3, num4, num5, num6, memo, dream, amount } =
      body;

    if (!round || !num1 || !num2 || !num3 || !num4 || !num5 || !num6) {
      return NextResponse.json(
        { error: "회차와 6개 번호는 필수입니다" },
        { status: 400 }
      );
    }

    const numbers = [num1, num2, num3, num4, num5, num6];
    for (const n of numbers) {
      if (n < 1 || n > 45) {
        return NextResponse.json(
          { error: "번호는 1~45 사이여야 합니다" },
          { status: 400 }
        );
      }
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      return NextResponse.json(
        { error: "중복된 번호가 있습니다" },
        { status: 400 }
      );
    }

    const entry = await prisma.lottoEntry.create({
      data: {
        round,
        num1,
        num2,
        num3,
        num4,
        num5,
        num6,
        memo: memo || null,
        dream: dream || null,
        amount: amount || 1000,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Failed to create entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}
