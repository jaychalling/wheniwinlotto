-- CreateTable
CREATE TABLE "LottoEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "round" INTEGER NOT NULL,
    "num1" INTEGER NOT NULL,
    "num2" INTEGER NOT NULL,
    "num3" INTEGER NOT NULL,
    "num4" INTEGER NOT NULL,
    "num5" INTEGER NOT NULL,
    "num6" INTEGER NOT NULL,
    "memo" TEXT,
    "dream" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 1000,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "WinningNumber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "round" INTEGER NOT NULL,
    "num1" INTEGER NOT NULL,
    "num2" INTEGER NOT NULL,
    "num3" INTEGER NOT NULL,
    "num4" INTEGER NOT NULL,
    "num5" INTEGER NOT NULL,
    "num6" INTEGER NOT NULL,
    "bonusNum" INTEGER NOT NULL,
    "drawDate" DATETIME NOT NULL,
    "prize1st" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "WishListItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "estimatedCost" INTEGER,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "WinningNumber_round_key" ON "WinningNumber"("round");
