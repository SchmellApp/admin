import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileParams, Game, MutationObserverResult } from "@app/types";
import { axiosClient } from "@app/lib";
import axios, { AxiosResponse } from "axios";

const addFile = async (params: FileParams): Promise<AxiosResponse<Game>> => {
  const { accessToken } = await axios
    .get("/api/users/token")
    .then((res) => res.data);

  axiosClient.defaults.headers.common.Authorization = `Bearer ${
    accessToken as string
  }`;

  return await axiosClient.post(`/cms/game/${params.id}/files/`, params.file);
};

const useGameFileMutation = (): MutationObserverResult<Game, FileParams> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: FileParams) => await addFile(params).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["games", "game"] });
      }
    }
  );
};

export default useGameFileMutation;
