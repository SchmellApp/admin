import { Week } from "@/types/week";
import { Game } from "@/types/game";
import { EmptyQuestionJson } from "@/types/question";

export const getEmptyJson = (
  relatedWeek: Week["id"],
  relatedGame: Game["id"]
): EmptyQuestionJson[] => [
  {
    type: "",
    questionDescription: "",
    phase: 0,
    function: {},
    punishment: 0,
    relatedWeek,
    relatedGame
  }
];
