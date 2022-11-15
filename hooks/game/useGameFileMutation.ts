import { cms } from "@app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";

const useGameFileMutation = (): MutationObserverResult<
  void,
  { id: number; file: File }
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: { id: number; file: File }) =>
      await cms.gameService.addGameLogo(params.id, params.file),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["games", "game"] });
      }
    }
  );
};

export default useGameFileMutation;
