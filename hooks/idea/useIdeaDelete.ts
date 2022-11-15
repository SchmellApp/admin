import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useIdeaDelete = (): MutationObserverResult<void, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schmellClient.idea.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
    }
  });
};

export default useIdeaDelete;
