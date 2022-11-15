import { Game } from "@app/types";

export interface CreateGameForm {
  name: Game["name"];
  description: Game["description"];
  file?: File;
  confirmWithoutImage: boolean;
}

export interface EditGameForm {
  description: Game["description"];
  file?: File;
}

export interface GameStatusForm {
  confirmedInitials: boolean;
  correctEndings: boolean;
  correctFunctions: boolean;
  correctGrammar: boolean;
  addedLogo: boolean;
}
