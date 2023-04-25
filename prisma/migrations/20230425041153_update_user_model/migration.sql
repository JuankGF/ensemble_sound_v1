-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
