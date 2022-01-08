-- CreateTable
CREATE TABLE "Files" (
    "fileID" TEXT NOT NULL PRIMARY KEY,
    "userID" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
