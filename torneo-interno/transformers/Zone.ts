import { zona } from "@prisma/client";
import { Category, Tournament } from "../models/Player";
import { Team, ZoneTeam } from "../models/Team";
import { Round, RoundView, Zone, ZoneType } from "../models/Zones";

const getZoneType = (type: string): ZoneType =>
  type === "LEAGUE" ? ZoneType.LEAGUE : ZoneType.PLAYOFF;

export const toZone = (
  zone: zona,
  category: Category,
  tournament: Tournament,
  teams?: Team[]
): Zone => {
  const zoneTeams: ZoneTeam[] = (teams || []).map((el) => {
    return { id: el.id || 0, name: el.name };
  });
  return {
    id: zone.id,
    name: zone.nombre || "",
    round: zone.ronda || 0,
    type: getZoneType(zone.tipo || ""),
    category: category,
    tournament: tournament,
    teams: zoneTeams,
  };
};

export const toRounds = (zones: Zone[]): Round[] => {
  const rounds: Round[] = [];

  zones.forEach((zone) => {
    const roundIndex = rounds.findIndex((round) => round.number === zone.round);

    if (roundIndex) rounds[roundIndex].zones.push(zone);
    else rounds.push({ number: zone.round, zones: [zone] });
  });

  return rounds.sort((prev, cur) => prev.number - cur.number);
};

export const toRoundView = (
  zones: Zone[],
  noZoneTeams: ZoneTeam[]
): RoundView => {
  return {
    zones,
    noZone: noZoneTeams,
  };
};
