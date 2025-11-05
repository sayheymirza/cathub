-- AlterTable
ALTER TABLE "user" ADD COLUMN "address" TEXT;
ALTER TABLE "user" ADD COLUMN "avatar" TEXT;
ALTER TABLE "user" ADD COLUMN "badge" TEXT;
ALTER TABLE "user" ADD COLUMN "city" TEXT;
ALTER TABLE "user" ADD COLUMN "email" TEXT;
ALTER TABLE "user" ADD COLUMN "postal_code" TEXT;
ALTER TABLE "user" ADD COLUMN "province" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consultation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "consultation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_consultation" ("createdAt", "id", "message", "name", "phone", "updatedAt") SELECT "createdAt", "id", "message", "name", "phone", "updatedAt" FROM "consultation";
DROP TABLE "consultation";
ALTER TABLE "new_consultation" RENAME TO "consultation";
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "company" BOOLEAN NOT NULL DEFAULT false,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "phone" TEXT NOT NULL,
    "national_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT,
    "company_name" TEXT,
    "company_phone" TEXT,
    "company_register_number" TEXT,
    "company_economic_code" TEXT,
    "service_category" TEXT NOT NULL,
    "service_subcategory" TEXT NOT NULL,
    "service_description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_order" ("address", "city", "company", "company_economic_code", "company_name", "company_phone", "company_register_number", "createdAt", "email", "firstname", "id", "lastname", "national_id", "phone", "postal_code", "province", "service_category", "service_description", "service_subcategory", "updatedAt") SELECT "address", "city", "company", "company_economic_code", "company_name", "company_phone", "company_register_number", "createdAt", "email", "firstname", "id", "lastname", "national_id", "phone", "postal_code", "province", "service_category", "service_description", "service_subcategory", "updatedAt" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
