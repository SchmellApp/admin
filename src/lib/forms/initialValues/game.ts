import {
  CreateGameForm,
  EditGameForm,
  GameStatusForm
} from "@/types/forms/game";
import { GameStatus } from "@/enums/game";
import { Game } from "@/types/game";

export const createGameInitialValues: CreateGameForm = {
  name: "",
  description: "",
  status: GameStatus.DEVELOPMENT,
  logo: "",
  confirmWithoutImage: false
};

export const editGameInitialValues = (
  description: Game["description"],
  logo: Game["logo"]
): EditGameForm => ({
  description,
  logo: ""
});

export const gameStatusInitialValues: GameStatusForm = {
  confirmedInitials: false,
  correctEndings: false,
  correctFunctions: false,
  correctGrammar: false
};
