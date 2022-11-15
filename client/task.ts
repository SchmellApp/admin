import SchmellClient from "@app/client/client";
import {
  CreateTaskForm,
  TaskFilters,
  UpdateTaskParams,
  Task as TaskType
} from "@app/types";

export default class Task {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  getAll = async (filters: TaskFilters): Promise<TaskType[]> =>
    await this.client.axiosInstance
      .get("/tasks/", { params: filters })
      .then((response) => response.data);

  get = async (id: string): Promise<TaskType> =>
    await this.client.axiosInstance
      .get(`/tasks/${id}/`)
      .then((response) => response.data);

  create = async (task: CreateTaskForm): Promise<TaskType> =>
    await this.client.axiosInstance
      .post("/tasks/", task)
      .then((response) => response.data);

  update = async (id: string, params: UpdateTaskParams): Promise<TaskType> =>
    await this.client.axiosInstance
      .patch(`/tasks/${id}/`, params)
      .then((response) => response.data);
}
