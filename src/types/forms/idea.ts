import { Idea } from "@/types/idea";

export interface IdeaForm extends Omit<Idea, "id" | "category"> {
  category?: Idea["category"];
}
