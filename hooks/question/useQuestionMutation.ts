import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateQuestion } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (question: CreateQuestion) =>
      await schmellClient.question.create(question),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionMutation;
