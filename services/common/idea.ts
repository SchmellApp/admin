import { Idea, IdeaForm } from "@app/types";
import axiosInstance from "../axios";

export const getIdea = async (id: number): Promise<Idea> =>
  await axiosInstance.get(`/common/idea/${id}/`);

export const getIdeas = async (): Promise<Idea[]> =>
  await axiosInstance.get(`/common/idea/`).then((res) => res.data);

export const createIdea = async (idea: IdeaForm): Promise<Idea> =>
  await axiosInstance.post(`/common/idea/`, idea).then((res) => res.data);

export const deleteIdea = async (id: number): Promise<void> =>
  await axiosInstance.delete(`/common/idea/${id}/`);
