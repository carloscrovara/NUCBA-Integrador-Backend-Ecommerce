-- AlterTable
ALTER TABLE `Roles` ALTER COLUMN `name` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `roleId` INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
