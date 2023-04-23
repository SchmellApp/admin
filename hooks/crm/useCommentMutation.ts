import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentForm, MutationObserverResult, Comment } from "@app/types";
import axios from "axios";

const useCommentMutation = (): MutationObserverResult<
  Comment,
  CreateCommentForm
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (comment: CreateCommentForm) =>
      await axios
        .post("/api/crm/tasks/comment", comment)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["comments"]);
      }
    }
  );
};

export default useCommentMutation;
