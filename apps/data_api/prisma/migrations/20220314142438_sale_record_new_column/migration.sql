-- AlterTable
ALTER TABLE `sale_records` ADD COLUMN `father_name` VARCHAR(255) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `price` INTEGER NULL,
    ADD COLUMN `referral` VARCHAR(191) NULL,
    ADD COLUMN `referral_phone` VARCHAR(191) NULL;
