import { RoundView, Zone } from "../models/Zones";
import { getActiveTournament } from "./db/TorneoService";
import { getZonesFromRound } from "./db/ZonaService";
import { ZoneTeam } from "../models/Team";
import { getCategoryFromDescription } from "./db/CategoriaService";
import { getZoneTeam } from "./db/EquipoService";
import { toRoundView } from "../transformers/Zone";

export const getAllZones = async (category: string): Promise<Zone[]> => {
  const zones: Zone[] = await getAllZones(category);

  return zones;
};

export const getAllZonesFromRound = async (
  category: string,
  round: number
): Promise<RoundView> => {
  const tournament = await getActiveTournament();
  const cat = await getCategoryFromDescription(category);
  const zones: Zone[] = await getZonesFromRound(category, round, tournament);

  const exclude: number[] = (zones || [])
    .map((el) => el.teams)
    .flat()
    .map((el) => (el ? el.id : 0));

  const noZoneTeams: ZoneTeam[] = await getZoneTeam(
    cat.id,
    tournament.id,
    exclude
  );

  return toRoundView(zones, noZoneTeams);
};
