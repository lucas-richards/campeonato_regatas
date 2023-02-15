import { equipo, Prisma } from "@prisma/client";
import { prismaClient } from "./PrismaClientServer";
import { toTeam } from "../../transformers/Team";

const client = prismaClient;

const teamIncludes = Prisma.validator<Prisma.jugador_infantilInclude>()({
  categoria: true,
  jugador: true,
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

  return teams.map((el) => toTeam(el, el.jugador, el.categoria, el.torneo));
};
