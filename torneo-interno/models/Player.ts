export interface Tournament {
  id: number;
  year: string;
}

export interface Level {
  description: string;
  value: number;
  symbol: string;
}

export interface Position {
  description: string;
  value: number;
  symbol: string;
}

export interface Owner {
  dni: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface YouthPlayer {
  emergencyPhone: string;
  member: boolean;
  position: Position;
  level: Level;
  tournament: Tournament;
  owner: Owner;
  player: Player;
  canPlay: boolean;
  thirdChild: boolean;
  captain: boolean;
  category: Category;
  teamId?: number;
}

export interface Category {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  news?: string;
}

export interface Player {
  dni: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: Date;
  gender: string;
  realLevel?: Level;
}

export interface Child {
  dni: string;
  name: string;
  lastName: string;
  category: string;
  canPlay: boolean;
  fee: number;
}
