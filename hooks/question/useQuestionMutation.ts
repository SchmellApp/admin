import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateQuestion, Question, MutationObserverResult } from "@app/types";
import { cms } from "@app/services";

const useQuestionMutation = (): MutationObserverResult<
  Question,
  CreateQuestion
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (question: CreateQuestion) =>
      await cms.questionService.createQuestion(question),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionMutation;
