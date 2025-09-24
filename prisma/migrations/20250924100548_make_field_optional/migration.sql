-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "user_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Freeboard" ALTER COLUMN "user_name" DROP NOT NULL,
ALTER COLUMN "heart_count" DROP NOT NULL;
