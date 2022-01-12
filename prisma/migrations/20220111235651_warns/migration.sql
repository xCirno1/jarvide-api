-- CreateTable
CREATE TABLE "Warns" (
    "warnID" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "modID" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Warns_pkey" PRIMARY KEY ("warnID")
);
