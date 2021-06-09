-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 0,
    "topic" TEXT NOT NULL DEFAULT 'GENERAL',
    "type" TEXT NOT NULL DEFAULT 'SHARED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("createdAt", "description", "id", "meetingId", "topic", "type", "userId") SELECT "createdAt", "description", "id", "meetingId", "topic", "type", "userId" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
