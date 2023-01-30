import { prismaClient } from "./PrismaClientServer";

const client = prismaClient;
export const isAssociated = async (dni: string): Promise<boolean> => {
  return (
    (await client.socio.findFirst({
      where: {
        dni: dni,
      },
    })) !== null
  );
};
