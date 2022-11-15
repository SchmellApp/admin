import { EditUser, User as UserType } from "@app/types";
import SchmellClient from "@app/client/client";

export default class User {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  getAll = async (): Promise<UserType[]> =>
    await this.client.axiosInstance
      .get("/users")
      .then((response) => response.data);

  get = async (id: string): Promise<UserType> =>
    await this.client.axiosInstance
      .get(`/users/${id}/`)
      .then((response) => response.data);

  getByAuth0Id = async (auth0Id: string): Promise<UserType> =>
    await this.client.axiosInstance
      .get(`/users/find/`, { params: { auth0Id } })
      .then((response) => response.data);

  update = async (id: string, user: EditUser): Promise<UserType> =>
    await this.client.axiosInstance
      .patch(`/users/${id}/`, user)
      .then((response) => response.data);

  addProfilePicture = async (id: string, file: File): Promise<UserType> =>
    await this.client.axiosInstance
      .post(`/users/${id}/files/`, file)
      .then((response) => response.data);
}
