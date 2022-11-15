import { CreateWeek, Week, WeekFilters } from "@app/types";
import axiosInstance from "../axios";

export const getWeek = async (id: number): Promise<Week> =>
  await axiosInstance.get(`/cms/week/${id}/`).then((res) => res.data);

export const getWeeks = async ({ relatedGame }: WeekFilters): Promise<Week[]> =>
  await axiosInstance
    .get("/cms/week/", {
      params: { relatedGame }
    })
    .then((res) => res.data);

export const createWeek = async (week: CreateWeek): Promise<Week> =>
  await axiosInstance.post("/cms/week/", week).then((res) => res.data);

export const deleteWeek = async (id: number): Promise<void> =>
  await axiosInstance.delete(`/cms/week/${id}/`);
