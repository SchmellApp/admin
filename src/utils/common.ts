import { Game } from "../types/game";
import { SelectItem } from "@mantine/core";

export const toOptions = (games: Game[]): SelectItem[] =>
  games.map((game) => ({
    label: game.name,
    value: String(game.id)
  }));
