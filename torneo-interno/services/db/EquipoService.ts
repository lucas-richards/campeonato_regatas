import { equipo, Prisma } from "@prisma/client";
import { prismaClient } from "./PrismaClientServer";
import { toTeam } from "../../transformers/Team";

const client = prismaClient;

const teamIncludes = Prisma.validator<Prisma.equipoInclude>()({
  categoria: true,
  jugador_infantil_equipo_capitanTojugador_infantil: true,
  torneo: true,
});

export const getTeams = async (category: number, tournament: number) => {
  const teams: Prisma.equipoGetPayload<{
    include: typeof teamIncludes;
  }>[] = await client.equipo.findMany({
    where: {
      categoria_id: category,
      torneo_id: tournament,
    },
    include: teamIncludes,
  });

  return teams.map((el) => toTeam(el, el.categoria, el.torneo));
};
