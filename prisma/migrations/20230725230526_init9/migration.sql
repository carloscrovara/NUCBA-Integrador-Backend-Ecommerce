/*
  Warnings:

  - Added the required column `quantity` to the `OrdersAndProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrdersAndProducts` ADD COLUMN `quantity` INTEGER NOT NULL;
