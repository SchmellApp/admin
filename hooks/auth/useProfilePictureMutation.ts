import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FileParams, MutationObserverResult, User } from "@app/types";
import { axiosClient } from "@app/lib";

const addFile = async (params: FileParams): Promise<AxiosResponse<User>> => {
  const { accessToken } = await axios
    .get("/api/users/token")
    .then((res) => res.data);

  axiosClient.defaults.headers.common.Authorization = `Bearer ${
    accessToken as string
  }`;

  return await axiosClient.post(`/users/${params.id}/files/`, params.file);
};

const useProfilePictureMutation = (): MutationObserverResult<
  User,
  FileParams
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: FileParams) => await addFile(params).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["self"]);
      }
    }
  );
};

export default useProfilePictureMutation;
