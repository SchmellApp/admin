import { CreateTaskForm, EditTaskForm } from "@/types/forms/task";
import { TaskPriority, TaskStatus } from "@/enums/task";
import { Task } from "@/types/task";

export const createTaskInitialValues: CreateTaskForm = {
  title: "",
  description: "",
  status: TaskStatus.PENDING,
  category: undefined,
  deadline: new Date(),
  priority: TaskPriority.MEDIUM,
  responsible: ""
};

export const editTaskInitialValues = (task: Task): EditTaskForm => ({
  id: task.id,
  status: task.status,
  deadline: task.deadline,
  relatedGame: task.relatedGame?.id.toString() ?? "",
  priority: task.priority
});
