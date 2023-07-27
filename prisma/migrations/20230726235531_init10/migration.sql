/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `OrdersAndProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OrdersAndProducts` DROP COLUMN `assignedAt`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `deletedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NULL;
