import { User } from "@/types/user";
import { IdeaForm } from "@/types/forms/idea";

export const createIdeaFormInitialValues = (createdBy: User): IdeaForm => ({
  category: undefined,
  ideaText: "",
  createdBy
});
