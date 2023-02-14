import { getActiveTournament } from "./db/TorneoService";

export const getPlayers = async (category: string) => {
  const currentTournament = await getActiveTournament();
};
