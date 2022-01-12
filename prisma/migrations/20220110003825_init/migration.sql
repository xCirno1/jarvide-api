-- CreateTable
CREATE TABLE "Files" (
    "fileID" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("fileID")
);
