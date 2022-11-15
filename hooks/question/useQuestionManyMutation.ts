import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateQuestion, Question, MutationObserverResult } from "@app/types";
import { cms } from "@app/services";

const useQuestionManyMutation = (): MutationObserverResult<
  Question[],
  CreateQuestion[]
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (questions: CreateQuestion[]) =>
      await cms.questionService.createMany(questions),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionManyMutation;
