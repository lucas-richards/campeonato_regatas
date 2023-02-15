import { Category, Level, Player, Position, Tournament } from "./Player";

export interface TeamPlayer {
  dni: string;
  name: string;
  lastName: string;
  position?: Position;
  level?: Level;
}

export interface Team {
  id: number;
  name: string;
  captain?: Player;
  category: Category;
  tournament: Tournament;
  players?: TeamPlayer[];
}

export interface TeamCreationsView {
  teams: Team[];
  noTeam: TeamPlayer[];
}
