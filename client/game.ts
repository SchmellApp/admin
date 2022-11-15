import SchmellClient from "@app/client/client";
import { AddGame, EditGame, Game as GameType } from "@app/types";

export default class Game {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  get = async (id: string): Promise<GameType> => {
    return await this.client.axiosInstance
      .get(`/cms/game/${id}/`)
      .then((res) => res.data);
  };

  getAll = async (): Promise<GameType[]> => {
    return await this.client.axiosInstance
      .get(`/cms/game/`)
      .then((res) => res.data);
  };

  create = async (game: AddGame): Promise<GameType> => {
    return await this.client.axiosInstance
      .post(`/cms/game/`, game)
      .then((res) => res.data);
  };

  update = async (id: string, game: EditGame): Promise<GameType> => {
    return await this.client.axiosInstance
      .patch(`/cms/game/${id}/`, game)
      .then((res) => res.data);
  };

  delete = async (id: string): Promise<void> => {
    return await this.client.axiosInstance
      .delete(`/cms/game/${id}/`)
      .then((res) => res.data);
  };

  addLogo = async (id: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    await this.client.axiosInstance.post(`/cms/game/${id}/files/`, formData);
  };
}
