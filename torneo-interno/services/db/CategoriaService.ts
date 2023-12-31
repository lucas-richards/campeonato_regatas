import { Category } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";
import { categoria } from "@prisma/client";
import { toCategory } from "../../transformers/Player";

const client = prismaClient;

export const getCategory = async (
  birthdate: Date,
  gender: string
): Promise<Category> => {
  const categoria: categoria = await client.categoria.findFirstOrThrow({
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
  return toCategory(categoria);
};

export const getCategoryFromDescription = async (
  description: string
): Promise<Category> => {
  const categoria: categoria = await client.categoria.findFirstOrThrow({
    where: {
      descripcion: description,
    },
  });

  return toCategory(categoria);
};
export const getCategoryId = async (
  birthdate: Date,
  gender: string
): Promise<Category> => {
  const categoria: categoria = await client.categoria.findFirstOrThrow({
    where: {
      ano_inicio: {
        lte: birthdate,
      },
      ano_fin: {
        gte: birthdate,
      },
    },
  });

  return toCategory(categoria);
};

export const getCategories = async (
  gender = "",
  youth = true
): Promise<Category[]> => {
  interface WhereClause {
    sexo?: string;
    juvenil: number;
  }

  const whereClause: WhereClause = {
    juvenil: youth ? 0 : 1,
  };

  if (gender !== "") whereClause.sexo = gender;

  const categorias: categoria[] = await client.categoria.findMany({
    where: whereClause,
  });

  return categorias.map((el) => toCategory(el));
};

export const getAllCategories = async () => {
  const categorias: categoria[] = await client.categoria.findMany();

  return categorias.map((el) => toCategory(el));
};
