import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import axios from "axios";

const useDeleteQuestionMutation = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) =>
      await axios.delete(`/api/cms/question/${id}`).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useDeleteQuestionMutation;
