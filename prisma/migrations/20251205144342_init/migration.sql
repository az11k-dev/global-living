/*
  Warnings:

  - A unique constraint covering the columns `[cityId]` on the table `Costs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Costs" ADD COLUMN     "cityId" INTEGER,
ALTER COLUMN "countryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "totalCost" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "temperature" INTEGER NOT NULL,
    "timezone" TEXT NOT NULL,
    "totalCost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Costs_cityId_key" ON "Costs"("cityId");

-- AddForeignKey
ALTER TABLE "Costs" ADD CONSTRAINT "Costs_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
