import { IdeaCategory } from "@app/enums";

export const IDEA_CATEGORIES = [
  {
    label: "Spill",
    value: IdeaCategory.GAMES
  },
  {
    label: "Design",
    value: IdeaCategory.DESIGN
  },
  {
    label: "Utvikling",
    value: IdeaCategory.DEVELOPMENT
  },
  {
    label: "Diverse",
    value: IdeaCategory.VARIOUS
  }
];

export const IDEA_CATEGORIES_ELEMENTS = [
  {
    title: "Spill",
    color: "#FFEC99",
    category: IdeaCategory.GAMES
  },
  {
    title: "Utviling",
    color: "#B2F2BB",
    category: IdeaCategory.DEVELOPMENT
  },
  {
    title: "Design",
    color: "#A5D8FF",
    category: IdeaCategory.DESIGN
  },
  {
    title: "Diverse",
    color: "#FFD8A8",
    category: IdeaCategory.VARIOUS
  }
];
