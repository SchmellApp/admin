import { CreateGameForm, EditGameForm, GameStatusForm, Game } from "@app/types";

export const createGameInitialValues: CreateGameForm = {
  name: "",
  description: "",
  file: undefined,
  confirmWithoutImage: false,
  isFamilyFriendly: false
};

export const editGameInitialValues = (
  description: Game["description"]
): EditGameForm => ({
  description,
  file: undefined
});

export const gameStatusInitialValues: GameStatusForm = {
  confirmedInitials: false,
  correctEndings: false,
  correctFunctions: false,
  correctGrammar: false,
  addedLogo: false
};
