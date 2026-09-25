/*
  Warnings:

  - You are about to drop the column `thubnail` on the `posts` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'AUTHOR';

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "thubnail",
ADD COLUMN     "thumbnail" TEXT;
