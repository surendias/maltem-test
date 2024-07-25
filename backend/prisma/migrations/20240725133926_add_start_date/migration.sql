-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "cafeId" TEXT,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Employee_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("cafeId", "emailAddress", "gender", "id", "name", "phoneNumber") SELECT "cafeId", "emailAddress", "gender", "id", "name", "phoneNumber" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_id_key" ON "Employee"("id");
CREATE UNIQUE INDEX "Employee_emailAddress_key" ON "Employee"("emailAddress");
CREATE INDEX "Employee_cafeId_idx" ON "Employee"("cafeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
