import { TaskPriority } from "./priority";
import { TaskStatus } from "./status";
import { TaskCategory } from "./category";

export const parseFilterValue = (value: string): string => {
  switch (value) {
    case TaskPriority.HIGH:
      return "Høy";
    case TaskPriority.MEDIUM:
      return "Medium";
    case TaskPriority.LOW:
      return "Lav";
    case TaskStatus.PENDING:
      return "Ikke startet";
    case TaskStatus.DOING:
      return "Pågår";
    case TaskStatus.DONE:
      return "Ferdig";
    case TaskCategory.ECONOMY:
      return "Økonomi";
    case TaskCategory.GAMES:
      return "Spill";
    case TaskCategory.DESIGN:
      return "Design";
    case TaskCategory.DEVELOPMENT:
      return "Utvikling";
    case TaskCategory.MARKETING:
      return "Markedsføring";
    default:
      return "Ukjent";
  }
};
