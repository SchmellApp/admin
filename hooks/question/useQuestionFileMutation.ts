import { cms } from "@app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult, Question } from "@app/types";

const useQuestionFileMutation = (): MutationObserverResult<
  Question,
  { id: number; file: File }
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, file }: { id: number; file: File }) =>
      await cms.questionService.addQuestionPicture(id, file),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionFileMutation;
