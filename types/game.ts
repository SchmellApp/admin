import { GameStatus } from "@app/enums";

export interface Game {
  id: number;
  name: string;
  description: string;
  lastUpdated: string;
  status: GameStatus;
  logo: string;
  logoUrl?: string;
  isFamilyFriendly: boolean;
}

export interface SimpleGame extends Pick<Game, "id" | "name"> {}

export interface AddGame extends Pick<Game, "name" | "description"> {}

export interface EditGame {
  description?: string;
  status?: GameStatus;
  isFamilyFriendly?: boolean;
}
