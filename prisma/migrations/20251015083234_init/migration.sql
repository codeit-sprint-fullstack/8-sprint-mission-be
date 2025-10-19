-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "encryptedPassword" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
