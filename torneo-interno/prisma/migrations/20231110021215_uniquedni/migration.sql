/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `jugador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `jugador_dni_key` ON `jugador`(`dni`);
