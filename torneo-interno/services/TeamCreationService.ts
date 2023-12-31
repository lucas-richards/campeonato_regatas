import { getActiveTournament } from "./db/TorneoService";
import { getAllPlayers } from "./db/JugadorInfantilService";
import { Category, YouthPlayer } from "../models/Player";
import { getCategoryFromDescription } from "./db/CategoriaService";
import { Team, TeamCreationsView, TeamPlayer, TeamView } from "../models/Team";
import {
  createFromTeamView,
  getTeams,
  updateFromTeamView,
} from "./db/EquipoService";
import { toTeamPlayer } from "../transformers/Team";

export const getFullTeams = async (
  category: string
): Promise<TeamCreationsView> => {
  const currentTournament = await getActiveTournament();
  const cat: Category = await getCategoryFromDescription(category);
  const players: YouthPlayer[] = await getAllPlayers(
    cat.id,
    currentTournament.id
  );
  const playersInCategory = players.length;
  const teams: Team[] = await getTeams(cat.id, currentTournament.id);
  teams.forEach((el) => {
    el.players = [];
  });

  const noTeam: TeamPlayer[] = [];
  players.forEach((el) => {
    let team = teams.find((t) => t.id === el.teamId);
    if (team && team.players) {
      team.players.push(toTeamPlayer(el));
    } else {
      noTeam.push(toTeamPlayer(el));
    }
  });

  return {
    teams,
    noTeam,
    playersInCategory,
  };
};

export const saveTeams = async (
  teams: TeamView[],
  category: string
): Promise<void> => {
  const tournament = await getActiveTournament();

  await teams.forEach(async (el) => {
    await (el.autogeneratedId
      ? createFromTeamView(el, category, tournament.id)
      : updateFromTeamView(el));
  });
};
