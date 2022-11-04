import { GameStatus } from "@/enums/game";

export interface Game {
  id: number;
  name: string;
  description: string;
  lastUpdated: Date;
  status: GameStatus;
  logo: string;
  logoUrl?: string;
}
