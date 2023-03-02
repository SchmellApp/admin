import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FileParams, MutationObserverResult, Question } from "@app/types";
import { axiosClient } from "@app/lib";

const addFile = async (
  params: FileParams
): Promise<AxiosResponse<Question>> => {
  const { accessToken } = await axios
    .get("/api/users/token")
    .then((res) => res.data);

  axiosClient.defaults.headers.common.Authorization = `Bearer ${
    accessToken as string
  }`;

  return await axiosClient.post(
    `/cms/question/${params.id}/files/`,
    params.file
  );
};
const useQuestionFileMutation = (): MutationObserverResult<
  Question,
  FileParams
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, file }: { id: string; file: FormData }) =>
      await addFile({ id, file }).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionFileMutation;
