import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useDeleteQuestionMutation = (): MutationObserverResult<void, string> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => await schmellClient.question.delete(id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useDeleteQuestionMutation;
