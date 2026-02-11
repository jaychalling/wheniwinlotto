import Header from "@/components/Header";
import CheckClient from "@/components/CheckClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CheckPage() {
  const winningNumbers = await prisma.winningNumber.findMany({
    orderBy: { round: "desc" },
    select: { round: true },
  });

  const rounds = winningNumbers.map((w) => w.round);

  return (
    <>
      <Header title="당첨 확인" showBack />
      <main className="px-4 py-5">
        <CheckClient availableRounds={rounds} />
      </main>
    </>
  );
}
