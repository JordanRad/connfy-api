/*
  Warnings:

  - You are about to drop the column `publicNote` on the `Meeting` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "noteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Meeting" ("date", "id", "noteId", "title", "userId") SELECT "date", "id", "noteId", "title", "userId" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
CREATE UNIQUE INDEX "Meeting.title_unique" ON "Meeting"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
