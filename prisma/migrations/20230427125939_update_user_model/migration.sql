/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatar_fkey";

-- DropIndex
DROP INDEX "User_avatar_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_image_key" ON "User"("image");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_image_fkey" FOREIGN KEY ("image") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
