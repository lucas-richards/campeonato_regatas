import { nivel, prisma } from "@prisma/client";
import { Level } from "../models/Player";
import { prismaClient } from "./PrismaClientServer";

const client = prismaClient;

const createLevel = (nivel: nivel): Level => {
  return {
    description: nivel.descripcion || "",
    value: nivel.valor || 0,
  };
};
export const getLevels = async (): Promise<Level[]> => {
  const levels: nivel[] = await client.nivel.findMany();

  const transformedLevels: Level[] = levels.map((el) => createLevel(el));

  return transformedLevels;
};

export const getLevel = async (level: number): Promise<Level> => {
  const levels: nivel[] = await client.nivel.findMany({
    where: {
      valor: level,
    },
  });

  return createLevel(levels[0]);
};

export const getLevelId = async (value: number): Promise<number> => {
  const nivel = await client.nivel.findFirst({
    where: {
      valor: value,
    },
  });

  return nivel?.id || 0;
};
