import { SelectItem } from "@mantine/core";
import { Game } from "../types/game";

export const buildGameOptions = (games: Game[]): SelectItem[] =>
  games.map((game) => ({
    label: game.name,
    value: String(game.id)
  }));
