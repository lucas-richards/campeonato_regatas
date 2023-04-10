import { prismaClient } from "./PrismaClientServer";
import { Zone } from "../../models/Zones";
import { zona } from "@prisma/client";
import { getCategoryFromDescription } from "./CategoriaService";
import { Category, Tournament } from "../../models/Player";
import { getActiveTournament } from "./TorneoService";
import { toZone } from "../../transformers/Zone";
import { Team } from "../../models/Team";
import { getTeamsFromZones } from "./EquipoService";
const client = prismaClient;

export const getAllZones = async (cat: string): Promise<Zone[]> => {
  const category: Category = await getCategoryFromDescription(cat);
  const tournament: Tournament = await getActiveTournament();

  const zones: zona[] = await client.zona.findMany({
    where: {
      categoria_id: category.id,
      torneo_id: tournament.id,
    },
  });

  const teams: Team[] = await getTeamsFromZones(zones.map((el) => el.id));

  return zones.map((el) => toZone(el, category, tournament, teams));
};

export const getRounds = async (cat: string): Promise<number[]> => {
  const category: Category = await getCategoryFromDescription(cat);
  const tournament: Tournament = await getActiveTournament();

  const zones: zona[] = await client.zona.findMany({
    where: {
      categoria_id: category.id,
      torneo_id: tournament.id,
    },
    distinct: ["ronda"],
  });

  return zones.map((el) => el.ronda);
};

export const getZonesFromRound = async (
  cat: string,
  round: number,
  tournament: Tournament
): Promise<Zone[]> => {
  const category: Category = await getCategoryFromDescription(cat);

  const zones: zona[] = await client.zona.findMany({
    where: {
      categoria_id: category.id,
      torneo_id: tournament.id,
      ronda: round,
    },
  });

  const teams: Team[] = await getTeamsFromZones(zones.map((el) => el.id));

  return zones.map((el) => toZone(el, category, tournament, teams));
};
