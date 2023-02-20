import { TeamView, TeamPlayer } from "../models/Team";

export interface AutoGeneratedTeam {
  players: TeamPlayer[];
  captain?: TeamPlayer;
  totalLevel: number;
  positionCounts: any;
}

export const autoCreateTeams = (
  players: TeamPlayer[],
  numTeams: number
): AutoGeneratedTeam[] => {
  // Sort the players by level in descending order
  const sortedPlayers = players.sort((a, b) => b.level.value - a.level.value);

  // Initialize an array of teams with empty player arrays, a total level of 0, and position counts of 0 for each position
  const teams: AutoGeneratedTeam[] = new Array(numTeams).fill(0).map(() => ({
    players: [],
    totalLevel: 0,
    positionCounts: { 1: 0, 2: 0, 3: 0, 4: 0 },
  }));

  // Assign each player to a team
  sortedPlayers.forEach((player) => {
    // Find the team with the lowest total level and position counts and add the player to that team
    const minTotalLevelTeam = teams.reduce((minTeam, team) => {
      const numPlayers = team.players.length;
      const numPlayersThisPosition = team.positionCounts[player.position.value];
      const avgPlayersPerPosition = numPlayers / 4;
      const positionDiff = Math.abs(
        avgPlayersPerPosition - numPlayersThisPosition
      );
      return team.totalLevel < minTeam.totalLevel ||
        positionDiff < Math.abs(avgPlayersPerPosition - numPlayersThisPosition)
        ? team
        : minTeam;
    });
    minTotalLevelTeam.players.push(player);
    minTotalLevelTeam.totalLevel += player.level.value;
    minTotalLevelTeam.positionCounts[player.position.value]++;

    // If the player can be a captain and the team still needs a captain, assign the player as the captain
    if (player.canBeCaptain) {
      const captainTeam = teams.find(
        (team) => !team.captain && team.players.length > 0
      );
      if (captainTeam) {
        captainTeam.captain = player;
        captainTeam.positionCounts[player.position.value]++;
      }
    }
  });

  // Assign any remaining captains to the teams with the highest total level
  teams.forEach((team) => {
    if (!team.captain && team.players.length > 0) {
      // Find the players who can be captains and sort them by level in descending order
      const captainCandidates = team.players
        .filter((player) => player.canBeCaptain)
        .sort((a, b) => b.level.value - a.level.value);

      // Assign the highest level captain candidate to be the captain
      if (captainCandidates.length > 0) {
        const captain = captainCandidates[0];
        team.captain = captain;
        team.positionCounts[captain.position.value]++;
      }
    }
  });

  console.log(teams);
  return teams;
};
