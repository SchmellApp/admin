import { common } from "@app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";

const useIdeaDelete = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: common.ideaService.deleteIdea,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
    }
  });
};

export default useIdeaDelete;
