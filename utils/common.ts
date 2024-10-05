import { Game, QuestionType } from "@app/types";
import { SelectItem } from "@mantine/core";
import { ContactFormType } from "@app/enums";

export const toOptions = (games: Game[]): SelectItem[] =>
  games.map((game) => ({
    label: game.name,
    value: String(game.id)
  }));

export const toQuestionTypeOptions = (types: QuestionType[]): SelectItem[] =>
  types.map((type) => ({
    label: type.name,
    value: String(type.id)
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
