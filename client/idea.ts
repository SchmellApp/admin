import SchmellClient from "@app/client/client";
import { Idea as IdeaType, IdeaForm } from "@app/types";

export default class Idea {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  getAll = async (): Promise<IdeaType[]> => {
    return await this.client.axiosInstance
      .get("/common/idea/")
      .then((res) => res.data);
  };

  create = async (idea: IdeaForm): Promise<IdeaType> => {
    return await this.client.axiosInstance
      .post("/common/idea/", idea)
      .then((res) => res.data);
  };

  delete = async (id: string): Promise<void> => {
    await this.client.axiosInstance.delete(`/common/idea/${id}/`);
  };
}
