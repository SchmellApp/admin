import SchmellClient from "@app/client/client";
import { CreateWeek, WeekFilters, Week as WeekType } from "@app/types";

export default class Week {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  get = async (id: string): Promise<WeekType> =>
    await this.client.axiosInstance
      .get(`/cms/week/${id}/`)
      .then((res) => res.data);

  getAll = async ({ relatedGame }: WeekFilters): Promise<WeekType[]> =>
    await this.client.axiosInstance
      .get("/cms/week/", {
        params: { relatedGame }
      })
      .then((res) => res.data);

  create = async (week: CreateWeek): Promise<WeekType> =>
    await this.client.axiosInstance
      .post("/cms/week/", week)
      .then((res) => res.data);

  delete = async (id: string): Promise<void> =>
    await this.client.axiosInstance.delete(`/cms/week/${id}/`);
}
