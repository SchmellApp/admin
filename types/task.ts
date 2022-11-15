import { TaskCategory, TaskPriority, TaskStatus } from "@app/enums";
import { SimpleUser } from "./user";
import { SimpleGame } from "./game";

export interface Task {
  id: number;
  createdDateTime: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  category: TaskCategory;
  priority: TaskPriority;
  responsibleUser: SimpleUser;
  relatedGame?: SimpleGame;
  lastUpdated: string;
}

export interface UpdateTaskParams {
  status?: TaskStatus;
  deadline?: Date;
  relatedGame?: number;
}
