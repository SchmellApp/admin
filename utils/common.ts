import { Game } from "@app/types";
import { SelectItem } from "@mantine/core";
import { WeekNumbers } from "@app/constants";
import { ContactFormType } from "@app/enums";

export const toOptions = (games: Game[]): SelectItem[] =>
  games.map((game) => ({
    label: game.name,
    value: String(game.id)
  }));

export const toWeekOptions = (): SelectItem[] =>
  WeekNumbers.map((week) => ({
    label: week.label,
    value: String(week.value)
  }));

export const toContactTypeString = (contactType: ContactFormType): string => {
  switch (contactType) {
    case ContactFormType.Contact:
      return "Kontakt";
    case ContactFormType.Feedback:
      return "Feedback";
    default:
      return "Unknown";
  }
};
