import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Question, UpdateQuestion, MutationObserverResult } from "@app/types";
import { cms } from "@app/services";

const useEditQuestionMutation = (
  id: number
): MutationObserverResult<Question, UpdateQuestion> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (question: UpdateQuestion) =>
      await cms.questionService.updateQuestion(id, question),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useEditQuestionMutation;
