import { Category } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";
import { categoria } from "@prisma/client";

const client = prismaClient;

export const getCategory = async (
  birthdate: Date,
  gender: string
): Promise<Category> => {
  const categoria: categoria | null = await client.categoria.findFirst({
    where: {
      sexo: gender,
      ano_inicio: {
        lte: birthdate,
      },
      ano_fin: {
        gte: birthdate,
      },
    },
  });
  return {
    description: categoria?.descripcion || "",
    startDate: categoria?.ano_inicio || new Date(),
    endDate: categoria?.ano_fin || new Date(),
  };
};

export const getCategoryId = async (
  birthdate: Date,
  gender: string
): Promise<number> => {
  const categoria: categoria | null = await client.categoria.findFirst({
    where: {
      ano_inicio: {
        lte: birthdate,
      },
      ano_fin: {
        gte: birthdate,
      },
    },
  });

  return categoria?.id || 0;
};
