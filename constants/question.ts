import { QuestionDislikeGroup } from "@app/enums";

export const QuestionHasDislikes = [
  {
    label: "Vis alle",
    value: QuestionDislikeGroup.All
  },
  {
    label: "Med dislikes",
    value: QuestionDislikeGroup.Dislikes
  },
  {
    label: "Uten dislikes",
    value: QuestionDislikeGroup.NoDislikes
  }
];

export const fromDislikeGroupToBoolean = {
  [QuestionDislikeGroup.All]: undefined,
  [QuestionDislikeGroup.Dislikes]: true,
  [QuestionDislikeGroup.NoDislikes]: false
};
