import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useQuestionFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, file }: { id: string; file: File }) =>
      await axios
        .post(`/api/cms/question/${id}/files`, file)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionFileMutation;
