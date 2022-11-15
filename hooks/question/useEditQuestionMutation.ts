import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateQuestion } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useEditQuestionMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (question: UpdateQuestion) =>
      await schmellClient.question.update(id, question),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useEditQuestionMutation;
