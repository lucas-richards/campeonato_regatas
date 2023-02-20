import { equipo, Prisma } from "@prisma/client";
import { prismaClient } from "./PrismaClientServer";
import { toTeam } from "../../transformers/Team";
import { Team, TeamView } from "../../models/Team";
import { getCategoryFromDescription } from "./CategoriaService";
import { getActiveTournament } from "./TorneoService";
import {
  getYouthPlayer,
  setTeam,
  getYouthPlayerById,
  getYouthPlayers,
} from "./JugadorInfantilService";

const client = prismaClient;

const teamIncludes = Prisma.validator<Prisma.equipoInclude>()({
  categoria: true,
  jugador_infantil_equipo_capitanTojugador_infantil: true,
  torneo: true,
});

export const getTeams = async (
  category: number,
  tournament: number
): Promise<Team[]> => {
  const teams: Prisma.equipoGetPayload<{
    include: typeof teamIncludes;
  }>[] = await client.equipo.findMany({
    where: {
      categoria_id: category,
      torneo_id: tournament,
    },
    include: teamIncludes,
  });

  const captains = await getYouthPlayers(teams.map((el) => el.capitan));

  return teams.map((el) =>
    toTeam(
      el,
      el.categoria,
      el.torneo,
      captains.find((cap) => cap.id === el.capitan)?.player
    )
  );
};

const createTeam = async (
  name: string,
  category: string,
  captainDni: string,
  tournament: number
): Promise<number> => {
  const cat = await (await getCategoryFromDescription(category)).id;
  const captain = await getYouthPlayer(captainDni, tournament);
  const team: equipo = await client.equipo.create({
    data: {
      nombre: name,
      categoria_id: cat,
      torneo_id: tournament,
      capitan: captain.id,
      zona_id: 0,
    },
  });
  return team.id;
};

export const createFromTeamView = async (
  team: TeamView,
  category: string,
  tournament: number
) => {
  const t: number = await createTeam(
    team.name || "",
    category,
    team.captain?.dni || "",
    tournament
  );

  team.players.forEach(async (el) => {
    await setTeam(el.dni, tournament, t);
  });
};

export const updateFromTeamView = async (team: TeamView) => {
  const tournament = await getActiveTournament();
  console.log(team.captain);
  const captain = await getYouthPlayer(team.captain?.dni || "", tournament.id);
  await client.equipo.update({
    data: {
      nombre: team.name,
      capitan: captain.id,
    },
    where: {
      id: +team.id,
    },
  });
  team.players.forEach(async (el) => {
    await setTeam(el.dni, tournament.id, +team.id);
  });
};
