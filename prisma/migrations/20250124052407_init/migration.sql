-- AlterTable
ALTER TABLE "users" ADD COLUMN     "employee_company_id" INTEGER;

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "main_user_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ativo',

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "companies_main_user_id_key" ON "companies"("main_user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_employee_company_id_fkey" FOREIGN KEY ("employee_company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_main_user_id_fkey" FOREIGN KEY ("main_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
