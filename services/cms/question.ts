import axiosInstance from "../axios";
import {
  QuestionFilters,
  CreateQuestion,
  Question,
  UpdateQuestion
} from "@app/types";

export const getQuestion = async (id: number): Promise<Question> =>
  await axiosInstance.get(`/cms/question/${id}/`).then((res) => res.data);

export const getQuestions = async ({
  relatedWeek
}: QuestionFilters): Promise<Question[]> =>
  await axiosInstance
    .get("/cms/question/", {
      params: {
        relatedWeek
      }
    })
    .then((res) => res.data);

export const createQuestion = async (
  question: CreateQuestion
): Promise<Question> =>
  await axiosInstance.post("/cms/question/", question).then((res) => res.data);

export const createMany = async (
  questions: CreateQuestion[]
): Promise<Question[]> =>
  await axiosInstance
    .post("/cms/question/many/", questions)
    .then((res) => res.data);

export const updateQuestion = async (
  id: number,
  question: UpdateQuestion
): Promise<Question> =>
  await axiosInstance
    .patch(`/cms/question/${id}/`, question)
    .then((res) => res.data);

export const deleteQuestion = async (id: number): Promise<void> =>
  await axiosInstance.delete(`/cms/question/${id}/`);

export const addQuestionPicture = async (
  id: number,
  file: File
): Promise<Question> => {
  const formData = new FormData();
  formData.append("file", file);
  return await axiosInstance
    .post(`/cms/question/${id}/files/`, formData)
    .then((response) => response.data);
};
