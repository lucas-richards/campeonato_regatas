import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

export interface ID {
  id: number;
}