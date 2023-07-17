import { Category, Tournament } from "./Player";
import { Team, TeamView, ZoneTeam } from "./Team";

export enum ZoneType {
  LEAGUE,
  PLAYOFF,
}

export interface Zone {
  id: number;
  name: string;
  round: number;
  type: ZoneType;
  category?: Category;
  categoryString?: string;
  tournament?: Tournament;
  teams: ZoneTeam[];
  new?: boolean;
}

export interface Match {
  zone: Zone;
  home: Team;
  homeGoals: Team;
  away: Team;
  awayGoals: Team;
}

export interface Round {
  number: number;
  zones: Zone[];
}

export interface RoundView {
  zones: Zone[];
  noZone: ZoneTeam[];
}
