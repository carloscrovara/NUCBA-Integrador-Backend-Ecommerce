/*
  Warnings:

  - You are about to drop the `_OrdersToProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_OrdersToProducts` DROP FOREIGN KEY `_OrdersToProducts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OrdersToProducts` DROP FOREIGN KEY `_OrdersToProducts_B_fkey`;

-- DropTable
DROP TABLE `_OrdersToProducts`;

-- CreateTable
CREATE TABLE `OrdersAndProducts` (
    `productId` INTEGER NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `assignedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`productId`, `orderId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrdersAndProducts` ADD CONSTRAINT `OrdersAndProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdersAndProducts` ADD CONSTRAINT `OrdersAndProducts_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
