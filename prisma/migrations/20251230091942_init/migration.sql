/*
  Warnings:

  - You are about to drop the column `City` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "City",
ADD COLUMN     "city" TEXT;
