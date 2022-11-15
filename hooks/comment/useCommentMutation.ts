import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentForm } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (comment: CreateCommentForm) =>
      await schmellClient.comment.create(comment),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["comments"]);
      }
    }
  );
};

export default useCommentMutation;
