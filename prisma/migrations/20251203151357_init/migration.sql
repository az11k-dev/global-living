-- DropForeignKey
ALTER TABLE "Costs" DROP CONSTRAINT "Costs_countryId_fkey";

-- AddForeignKey
ALTER TABLE "Costs" ADD CONSTRAINT "Costs_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
