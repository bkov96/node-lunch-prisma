-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrowings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "borrowings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_books_to_borrowings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "categories_name_idx" ON "categories"("name");

-- CreateIndex
CREATE INDEX "books_title_author_idx" ON "books"("title", "author");

-- CreateIndex
CREATE UNIQUE INDEX "_books_to_borrowings_AB_unique" ON "_books_to_borrowings"("A", "B");

-- CreateIndex
CREATE INDEX "_books_to_borrowings_B_index" ON "_books_to_borrowings"("B");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_books_to_borrowings" ADD CONSTRAINT "_books_to_borrowings_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_books_to_borrowings" ADD CONSTRAINT "_books_to_borrowings_B_fkey" FOREIGN KEY ("B") REFERENCES "borrowings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
