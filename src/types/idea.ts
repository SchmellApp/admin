import { IdeaCategory } from "../enums/idea";
import { User } from "./user";

export interface Idea {
  id: number;
  ideaText: string;
  category: IdeaCategory;
  createdBy: User;
}
