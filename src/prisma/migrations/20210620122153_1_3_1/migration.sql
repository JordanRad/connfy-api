-- DropIndex
DROP INDEX "Meeting.title_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'Meeting title',
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TEXT NOT NULL DEFAULT '12.26.2021',
    "startTime" TEXT NOT NULL DEFAULT '00:00',
    "endTime" TEXT NOT NULL DEFAULT '01:00',
    "users" TEXT NOT NULL,
    "channelId" INTEGER DEFAULT 0,
    FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meeting" ("channelId", "createdAt", "date", "description", "endTime", "id", "startTime", "title", "users") SELECT "channelId", "createdAt", "date", "description", "endTime", "id", "startTime", "title", "users" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
