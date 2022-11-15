import { User, EditUser } from "@app/types";
import axiosInstance from "./axios";

export const getUsers = async (): Promise<User[]> => {
  return await axiosInstance.get(`/users/`).then((response) => response.data);
};

export const getUserByAuth0ID = async (auth0Id: string): Promise<User> => {
  return await axiosInstance
    .get(`/users/find/`, { params: { auth0Id } })
    .then((response) => response.data);
};

export const updateUser = async (id: string, user: EditUser): Promise<User> => {
  return await axiosInstance
    .patch(`/users/${id}/`, user)
    .then((response) => response.data);
};

export const addProfilePicture = async (
  id: string,
  file: File
): Promise<User> => {
  const formData = new FormData();
  formData.append("file", file);
  return await axiosInstance
    .post(`/users/${id}/files/`, formData)
    .then((response) => response.data);
};
