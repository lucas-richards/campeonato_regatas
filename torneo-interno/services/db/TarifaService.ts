import { tarifas } from "@prisma/client";
import { prismaClient } from "./PrismaClientServer";
import { isAssociated } from "./SocioService";

const client = prismaClient;

export const getFee = async (isAssociated: boolean): Promise<number> => {
  const fee: tarifas | null = await client.tarifas.findFirst({
    where: {
      socio: isAssociated ? 1 : 0,
      fecha_inicio: {
        lte: new Date(),
      },
      fecha_cierre: {
        gte: new Date(),
      },
    },
  });

  return fee?.valor || 0;
};
