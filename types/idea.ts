import { IdeaCategory } from "@app/enums";
import { SimpleUser } from "./user";

export interface Idea {
  id: number;
  ideaText: string;
  category: IdeaCategory;
  createdBy: SimpleUser;
}
