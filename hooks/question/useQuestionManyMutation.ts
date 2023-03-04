import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateQuestion } from "@app/types";
import axios from "axios";

const useQuestionManyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (questions: CreateQuestion[]) =>
      await axios
        .post(`/api/cms/question/many/`, questions)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionManyMutation;
