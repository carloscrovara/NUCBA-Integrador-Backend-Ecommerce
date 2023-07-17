-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `status` VARCHAR(255) NOT NULL DEFAULT 'created',
    `userId` VARCHAR(36) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrdersToProducts` (
    `A` VARCHAR(36) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrdersToProducts_AB_unique`(`A`, `B`),
    INDEX `_OrdersToProducts_B_index`(`B`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrdersToProducts` ADD CONSTRAINT `_OrdersToProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrdersToProducts` ADD CONSTRAINT `_OrdersToProducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
