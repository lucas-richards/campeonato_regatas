import { puesto } from "@prisma/client";
import { Position } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";

const client = prismaClient;

const createPosition = (puesto: puesto): Position => {
  return {
    description: puesto.descripcion,
    value: puesto.valor,
  };
};
export const getPositions = async (): Promise<Position[]> => {
  const positions: puesto[] = await client.puesto.findMany();

  const transformedPositions: Position[] = positions.map((el) =>
    createPosition(el)
  );

  return transformedPositions;
};

export const getPosition = async (position: number): Promise<Position> => {
  const positions: puesto[] = await client.puesto.findMany({
    where: {
      valor: position,
    },
  });

  return createPosition(positions[0]);
};

export const getPositionId = async (value: number): Promise<number> => {
  const puesto = await client.puesto.findFirst({
    where: {
      valor: value,
    },
  });

  return puesto?.id || 0;
};
