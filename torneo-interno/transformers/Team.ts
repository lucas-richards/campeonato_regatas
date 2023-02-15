import { categoria, equipo, jugador, torneo } from "@prisma/client";
import { YouthPlayer } from "../models/Player";
import { Team, TeamPlayer } from "../models/Team";
import { toCategory, toPlayer, toTournament } from "./Player";

export const toTeamPlayer = (player: YouthPlayer): TeamPlayer => {
  return {
    dni: player.player?.dni || "",
    name: player.player?.name || "",
    lastName: player.player?.lastName || "",
    position: player.position,
    level: player.level,
  };
};

export const toTeam = (
  team: equipo,
  captain: jugador,
  category: categoria,
  tournament: torneo,
  players?: YouthPlayer[]
): Team => {
  return {
    id: team.id,
    name: team.nombre,
    captain: toPlayer(captain),
    category: toCategory(category),
    tournament: toTournament(tournament),
    players: players?.map((el) => toTeamPlayer(el)),
  };
};
