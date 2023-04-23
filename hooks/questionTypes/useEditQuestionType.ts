import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MutationObserverResult,
  QuestionType,
  UpdateQuestionType
} from "@app/types";
import axios from "axios";

const useEditQuestionType = (
  id: number
): MutationObserverResult<QuestionType, UpdateQuestionType> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (questionType: UpdateQuestionType) =>
      await axios
        .patch(`/api/cms/question/type/${id}`, questionType)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questionTypes"]);
      }
    }
  );
};

export default useEditQuestionType;
