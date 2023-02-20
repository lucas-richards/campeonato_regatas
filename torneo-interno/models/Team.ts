import { Category, Level, Player, Position, Tournament } from "./Player";

export interface TeamPlayer {
  dni: string;
  name: string;
  lastName: string;
  position: Position;
  level: Level;
  canBeCaptain: boolean;
}

export interface Team {
  id?: number;
  name: string;
  captain?: TeamPlayer;
  category: Category;
  tournament: Tournament;
  players?: TeamPlayer[];
}

export interface TeamCreationsView {
  teams: Team[];
  noTeam: TeamPlayer[];
  playersInCategory: number;
}

export interface TeamView {
  id: string;
  name?: string;
  players: TeamPlayer[];
  captain: TeamPlayer | null;
}
