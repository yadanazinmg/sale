-- AlterTable
ALTER TABLE `system_data` MODIFY `description` VARCHAR(128) NULL,
    MODIFY `value` VARCHAR(255) NULL,
    MODIFY `metadata` VARCHAR(1024) NULL;

-- CreateTable
CREATE TABLE `ticket_stations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `installment_records` (
    `id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `particular` VARCHAR(191) NULL,
    `qty` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `net_amount` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_records` (
    `id` VARCHAR(191) NOT NULL,
    `voucher_no` VARCHAR(255) NOT NULL,
    `customer` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL,
    `give_amount` INTEGER NULL,
    `total_amount` INTEGER NOT NULL,
    `net_amount` INTEGER NULL,
    `shop_id` VARCHAR(191) NOT NULL,
    `product_status` ENUM('BEFORE', 'AFTER') NOT NULL DEFAULT 'BEFORE',
    `user_id` VARCHAR(191) NULL,
    `user_name` VARCHAR(191) NULL,
    `metadata` VARCHAR(1024) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `installment_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `installment_records` ADD CONSTRAINT `installment_records_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `sale_records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `installment_records` ADD CONSTRAINT `installment_records_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_records` ADD CONSTRAINT `sale_records_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `ticket_stations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_records` ADD CONSTRAINT `sale_records_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
