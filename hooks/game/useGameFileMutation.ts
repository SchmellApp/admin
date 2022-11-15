import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useGameFileMutation = (): MutationObserverResult<
  void,
  { id: string; file: File }
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: { id: string; file: File }) =>
      await schmellClient.game.addLogo(params.id, params.file),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["games", "game"] });
      }
    }
  );
};

export default useGameFileMutation;
