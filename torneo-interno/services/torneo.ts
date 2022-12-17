import { PrismaClient } from "@prisma/client";
const getTorneos = () => {
  const client = new PrismaClient();
  return client.torneo.findMany();
};

export default getTorneos;
