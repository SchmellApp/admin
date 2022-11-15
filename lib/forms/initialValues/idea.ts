import { User, IdeaForm } from "@app/types";
import { IdeaCategory } from "@app/enums";

export const createIdeaFormInitialValues = (
  createdBy: User["id"]
): IdeaForm => ({
  category: "" as IdeaCategory,
  ideaText: "",
  createdBy
});
