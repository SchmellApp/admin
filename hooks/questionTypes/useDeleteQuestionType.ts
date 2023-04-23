import { MutationObserverResult } from "@app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteQuestionType = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) =>
      await axios
        .delete(`/api/cms/question/type/${id}`)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questionTypes"]);
      }
    }
  );
};

export default useDeleteQuestionType;
