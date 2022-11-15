import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult, IdeaForm, Idea } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useIdeaMutation = (): MutationObserverResult<Idea, IdeaForm> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: IdeaForm) =>
      await schmellClient.idea.create(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
    }
  });
};

export default useIdeaMutation;
