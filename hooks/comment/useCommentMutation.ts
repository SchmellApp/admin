import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentForm } from "@app/types";
import { task } from "@app/services";

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (comment: CreateCommentForm) =>
      await task.commentService.createComment(comment),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["comments"]);
      }
    }
  );
};

export default useCommentMutation;
