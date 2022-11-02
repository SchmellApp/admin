import { IdeaCategory } from "../enums/idea";
import { Idea } from "../types/idea";
import { ListElement } from "../types/ui/list";

export const filterByCategory = (
  ideas: Idea[],
  category: IdeaCategory
): Idea[] => ideas.filter((idea) => idea.category === category);

export const toListElements = (ideas: Idea[]): ListElement[] =>
  ideas.map((idea) => ({
    text: idea.ideaText,
    id: idea.id,
    avatarUrl: idea.createdBy.profilePictureUrl
  }));
