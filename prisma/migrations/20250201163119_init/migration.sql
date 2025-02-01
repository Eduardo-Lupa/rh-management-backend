/*
  Warnings:

  - You are about to drop the column `status` on the `companies` table. All the data in the column will be lost.
  - The `status` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('awaiting_approval', 'approved', 'finished');

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "status",
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'awaiting_approval';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "Status";
