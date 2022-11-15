import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateQuestion } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useQuestionManyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (questions: CreateQuestion[]) =>
      await schmellClient.question.createMany(questions),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionManyMutation;
