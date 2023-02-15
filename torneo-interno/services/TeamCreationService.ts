import { getActiveTournament } from "./db/TorneoService";
import { getAllPlayers } from "./db/JugadorInfantilService";
import { Category, YouthPlayer } from "../models/Player";
import { getCategoryFromDescription } from "./db/CategoriaService";
import { Team, TeamCreationsView, TeamPlayer } from "../models/Team";
import { getTeams } from "./db/EquipoService";
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
  const teams: Team[] = await getTeams(cat.id, currentTournament.id);
  const noTeam: TeamPlayer[] = [];
  players.forEach((el) => {
    const team = teams.find((t) => t.id === el.teamId);

    if (team) {
      if (!team.players) team.players = [];

      team.players.push(toTeamPlayer(el));
    } else {
      noTeam.push(toTeamPlayer(el));
    }
  });
  return {
    teams,
    noTeam,
  };
};
