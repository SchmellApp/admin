import { GameStatus } from "@app/enums";

export const GAME_STATUS = [
  {
    label: "Under arbeid",
    value: GameStatus.DEVELOPMENT
  },
  {
    label: "Klar",
    value: GameStatus.READY
  },
  {
    label: "Utvikling",
    value: GameStatus.DEPLOYED
  }
];
