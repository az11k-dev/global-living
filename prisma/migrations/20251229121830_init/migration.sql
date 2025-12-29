-- AlterTable
ALTER TABLE "User" ADD COLUMN     "City" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "interestedCountries" JSONB,
ADD COLUMN     "monthlyBudget" TEXT;
