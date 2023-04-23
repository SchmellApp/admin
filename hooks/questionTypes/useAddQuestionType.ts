import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateQuestionType,
  MutationObserverResult,
  QuestionType
} from "@app/types";
import axios from "axios";

const useAddQuestionType = (): MutationObserverResult<
  QuestionType,
  CreateQuestionType
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (questionType: CreateQuestionType) =>
      await axios
        .post("/api/cms/question/type", questionType)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questionTypes"]);
      }
    }
  );
};

export default useAddQuestionType;
