import { torneo } from "@prisma/client";
import { Tournament } from "../../models/Player";
import { prismaClient } from "./PrismaClientServer";

type GetTournaments = () => Promise<Tournament[]>;

const client = prismaClient;

export const getTournaments: GetTournaments = async (): Promise<
  Tournament[]
> => {
  const tournaments: torneo[] = await client.torneo.findMany();
  return tournaments.map((el) => {
    return { year: el.ano_torneo, id: el.id };
  });
};

export const getActiveTournament = async (): Promise<Tournament> => {
  const torneos: torneo[] = await client.torneo.findMany({
    orderBy: {
      id: "desc",
    },
    take: 1,
  });

  const torneo: Tournament = {
    year: torneos[0].ano_torneo,
    id: torneos[0].id,
  };

  return torneo;
};
