import { cms } from "@app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";

const useDeleteGameMutation = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => await cms.gameService.deleteGame(id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["games"] });
      }
    }
  );
};

export default useDeleteGameMutation;
