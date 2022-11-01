import { TaskCategory } from "../types/task/category";

export const parseCategoryToUnderstandable = (
  category: TaskCategory
): string => {
  switch (category) {
    case TaskCategory.DESIGN:
      return "Design";
    case TaskCategory.DEVELOPMENT:
      return "Utvikling";
    case TaskCategory.GAMES:
      return "Spill";
    case TaskCategory.MARKETING:
      return "Markedsføring";
    case TaskCategory.ECONOMY:
      return "Økonomi";
    default:
      return "Annet";
  }
};
