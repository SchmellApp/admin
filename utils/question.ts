import { Week, Game, EmptyQuestionJson } from "@app/types";

export const getEmptyJson = (
  relatedWeek: Week["id"],
  relatedGame: Game["id"]
): EmptyQuestionJson[] => [
  {
    type: "",
    questionDescription: "",
    phase: 0,
    function: "",
    punishment: 0,
    relatedWeek,
    relatedGame
  }
];
