import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateQuestion, MutationObserverResult, Question } from "@app/types";
import axios from "axios";

const useQuestionMutation = (): MutationObserverResult<
  Question,
  CreateQuestion
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (question: CreateQuestion) =>
      await axios.post(`/api/cms/question/`, question).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionMutation;
