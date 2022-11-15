import { AddGame, EditGame, Game } from "@app/types";
import axiosInstance from "../axios";

export const getGame = async (id: number): Promise<Game> =>
  await axiosInstance.get(`/cms/game/${id}/`).then((response) => response.data);

export const getGames = async (): Promise<Game[]> =>
  await axiosInstance.get(`/cms/game/`).then((response) => response.data);

export const createGame = async (game: AddGame): Promise<Game> =>
  await axiosInstance
    .post(`/cms/game/`, game)
    .then((response) => response.data);

export const updateGame = async (id: number, game: EditGame): Promise<Game> =>
  await axiosInstance
    .patch(`/cms/game/${id}/`, game)
    .then((response) => response.data);

export const deleteGame = async (id: number): Promise<void> =>
  await axiosInstance
    .delete(`/cms/game/${id}/`)
    .then((response) => response.data);

export const addGameLogo = async (id: number, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  await axiosInstance.post(`/cms/game/${id}/files/`, formData);
};
