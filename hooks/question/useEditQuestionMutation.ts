import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateQuestion } from "@app/types";
import axios from "axios";

const useEditQuestionMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (question: UpdateQuestion) =>
      await axios
        .patch(`/api/cms/question/${id}`, question)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useEditQuestionMutation;
