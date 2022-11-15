import { Idea, User } from "@app/types";

export interface IdeaForm {
  ideaText: Idea["ideaText"];
  category: Idea["category"];
  createdBy: User["id"];
}
