-- CreateTable
CREATE TABLE "Costs" (
    "id" SERIAL NOT NULL,
    "rent" INTEGER NOT NULL,
    "food" INTEGER NOT NULL,
    "transport" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Costs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Costs_countryId_key" ON "Costs"("countryId");

-- AddForeignKey
ALTER TABLE "Costs" ADD CONSTRAINT "Costs_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
