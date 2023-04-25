/*
  Warnings:

  - You are about to drop the column `is_rental_available` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `next_rental_date` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "is_rental_available",
DROP COLUMN "next_rental_date";

-- CreateTable
CREATE TABLE "EquipmentRental" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "in_rental_quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "rental_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentRental_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EquipmentRental" ADD CONSTRAINT "EquipmentRental_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
