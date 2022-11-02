import { IdeaCategory } from "./ideas/category";
import { User } from "./user";

export interface Idea {
  id: number;
  ideaText: string;
  category: IdeaCategory;
  createdBy: User;
}
