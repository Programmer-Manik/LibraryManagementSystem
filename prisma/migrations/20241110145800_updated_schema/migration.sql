/*
  Warnings:

  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book_authors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "book_authors" DROP CONSTRAINT "book_authors_authorId_fkey";

-- DropForeignKey
ALTER TABLE "book_authors" DROP CONSTRAINT "book_authors_bookId_fkey";

-- DropTable
DROP TABLE "authors";

-- DropTable
DROP TABLE "book_authors";
