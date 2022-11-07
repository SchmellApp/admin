import { Task } from "@/types/task";

export interface CreateTaskForm
  extends Omit<Task, "id" | "createdDateTime" | "lastUpdated" | "responsibleUser" | "category"> {
  title: string;
  description: string;
  category?: Task["category"];
  responsible: string;
}

export interface EditTaskForm {
  id: Task["id"];
  status: Task["status"];
  deadline: Task["deadline"];
  priority: Task["priority"];
  relatedGame: string;
}
