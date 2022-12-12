-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- DropIndex
DROP INDEX "book_id_key";

-- DropIndex
DROP INDEX "book_collection_id_key";

-- DropIndex
DROP INDEX "genre_id_key";

-- DropIndex
DROP INDEX "profile_id_key";

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
