import SchmellClient from "@app/client/client";
import { StatisticsResponse } from "@app/types";

export default class Statistics {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  get = async (): Promise<StatisticsResponse> => {
    return await this.client.axiosInstance
      .get(`/common/statistics/`)
      .then((res) => res.data);
  };
}
