import { Game } from "./game";

export interface Week {
  id: number;
  relatedGame: Game;
  weekNumber: number;
}
