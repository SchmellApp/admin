import SchmellClient from "@app/client/client";
import {
  CreateQuestion,
  QuestionFilters,
  UpdateQuestion,
  Question as QuestionType
} from "@app/types";

export default class Question {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  get = async (id: string): Promise<QuestionType> =>
    await this.client.axiosInstance
      .get(`/cms/question/${id}/`)
      .then((res) => res.data);

  getAll = async ({ relatedWeek }: QuestionFilters): Promise<QuestionType[]> =>
    await this.client.axiosInstance
      .get("/cms/question/", {
        params: {
          relatedWeek
        }
      })
      .then((res) => res.data);

  create = async (question: CreateQuestion): Promise<QuestionType> =>
    await this.client.axiosInstance
      .post("/cms/question/", question)
      .then((res) => res.data);

  createMany = async (questions: CreateQuestion[]): Promise<QuestionType[]> =>
    await this.client.axiosInstance
      .post("/cms/question/many/", questions)
      .then((res) => res.data);

  update = async (
    id: string,
    question: UpdateQuestion
  ): Promise<QuestionType> =>
    await this.client.axiosInstance
      .patch(`/cms/question/${id}/`, question)
      .then((res) => res.data);

  delete = async (id: string): Promise<void> =>
    await this.client.axiosInstance.delete(`/cms/question/${id}/`);

  addPicture = async (id: string, file: File): Promise<QuestionType> => {
    const formData = new FormData();
    formData.append("file", file);
    return await this.client.axiosInstance
      .post(`/cms/question/${id}/files/`, formData)
      .then((response) => response.data);
  };
}
