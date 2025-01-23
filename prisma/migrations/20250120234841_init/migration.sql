-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('company', 'hunter');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativo', 'inativo');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "cell_phone" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ativo',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
