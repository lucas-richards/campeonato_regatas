import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { dni } = req.query;
  console.log('this is id',dni);
  const jugador = await prisma.jugador.findUnique({
    where: {
      
      dni: dni as string,
    }
  });
  res.json(jugador);
}