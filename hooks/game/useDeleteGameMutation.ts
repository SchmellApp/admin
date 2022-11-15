import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useDeleteGameMutation = (): MutationObserverResult<void, string> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => await schmellClient.game.delete(id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["games"] });
      }
    }
  );
};

export default useDeleteGameMutation;
