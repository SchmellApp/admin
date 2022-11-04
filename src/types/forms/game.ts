import { Game } from "@/types/game";

export interface CreateGameForm
  extends Omit<Game, "id" | "lastUpdated" | "logoUrl"> {
  confirmWithoutImage: boolean;
}

export interface EditGameForm extends Pick<Game, "description" | "logo"> {}

export interface GameStatusForm {
  confirmedInitials: boolean;
  correctEndings: boolean;
  correctFunctions: boolean;
  correctGrammar: boolean;
}
