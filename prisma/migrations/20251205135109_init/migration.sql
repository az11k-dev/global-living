/*
  Warnings:

  - You are about to drop the column `continet` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "continet",
ADD COLUMN     "continent" TEXT;
