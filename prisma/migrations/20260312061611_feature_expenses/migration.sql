-- CreateTable
CREATE TABLE "expenses-category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "expenses-category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expensesCategoryId" TEXT NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpensesItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "expenseId" TEXT NOT NULL,

    CONSTRAINT "ExpensesItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "expenses-category_businessId_idx" ON "expenses-category"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "expenses-category_businessId_name_key" ON "expenses-category"("businessId", "name");

-- AddForeignKey
ALTER TABLE "expenses-category" ADD CONSTRAINT "expenses-category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses-category" ADD CONSTRAINT "expenses-category_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_expensesCategoryId_fkey" FOREIGN KEY ("expensesCategoryId") REFERENCES "expenses-category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpensesItem" ADD CONSTRAINT "ExpensesItem_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
