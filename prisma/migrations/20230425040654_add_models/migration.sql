/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[avatar]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('LIVE_EVENT', 'RENTAL', 'STUDIO', 'SOUND_TEST');

-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('MIXERS', 'MICROPHONES', 'SUB', 'SPEAKERS', 'MONITORS', 'STAGE_BOXES', 'DIRECT_INPUT', 'INSTRUMENTS', 'TOOLS');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "avatar" TEXT;

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "estimated_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" "ServiceType" NOT NULL,
    "media_id" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "description" TEXT NOT NULL,
    "media_id" TEXT,
    "type" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "is_synchronized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "media_id" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dimension" TEXT,
    "weight" DOUBLE PRECISION,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "type" "EquipmentType" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "is_rental_available" BOOLEAN NOT NULL DEFAULT true,
    "next_rental_date" TIMESTAMP(3),

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Service_media_id_key" ON "Service"("media_id");

-- CreateIndex
CREATE INDEX "Service_name_idx" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Event_media_id_key" ON "Event"("media_id");

-- CreateIndex
CREATE INDEX "Event_name_idx" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_media_id_key" ON "Equipment"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_name_key" ON "Equipment"("name");

-- CreateIndex
CREATE INDEX "Equipment_name_idx" ON "Equipment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Media_path_key" ON "Media"("path");

-- CreateIndex
CREATE INDEX "Media_path_idx" ON "Media"("path");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatar_key" ON "User"("avatar");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatar_fkey" FOREIGN KEY ("avatar") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
