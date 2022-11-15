import { common } from "@app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult, IdeaForm, Idea } from "@app/types";

const useIdeaMutation = (): MutationObserverResult<Idea, IdeaForm> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: common.ideaService.createIdea,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
    }
  });
};

export default useIdeaMutation;
