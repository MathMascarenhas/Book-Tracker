/*
  Warnings:

  - You are about to drop the column `profileId` on the `book_collection` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_BookToGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `book_collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_premium` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "book_collection" DROP CONSTRAINT "book_collection_profileId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "book_collection" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "is_admin",
ADD COLUMN     "is_premium" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "_BookToGenre";

-- DropTable
DROP TABLE "genre";

-- DropTable
DROP TABLE "profile";

-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "book_collection" ADD CONSTRAINT "book_collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
