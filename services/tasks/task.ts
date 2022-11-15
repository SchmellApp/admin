import {
  CreateTaskForm,
  Task,
  TaskFilters,
  UpdateTaskParams
} from "@app/types";
import { axiosInstance } from "@app/services";

export const getTask = async (id: string): Promise<Task> =>
  await axiosInstance.get(`/tasks/${id}/`).then((res) => res.data);

export const getTasks = async (filters: TaskFilters): Promise<Task[]> => {
  return await axiosInstance
    .get("/tasks", { params: filters })
    .then((res) => res.data);
};

export const createTask = async (task: CreateTaskForm): Promise<Task> =>
  await axiosInstance.post("/tasks/", task).then((res) => res.data);

export const updateTask = async (
  id: string,
  task: UpdateTaskParams
): Promise<Task> =>
  await axiosInstance.patch(`/tasks/${id}/`, task).then((res) => res.data);

export const getTasksForToday = async (
  responsibleUser: string
): Promise<Task[]> => {
  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 2 * 7);

  const params = {
    responsibleUser,
    toDate
  };

  return await axiosInstance.get("/tasks", { params }).then((res) => res.data);
};
