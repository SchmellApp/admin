import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import axios from "axios";

const useGameFileMutation = (): MutationObserverResult<
  void,
  { id: string; file: File }
> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: { id: string; file: File }) =>
      await axios
        .post(`/api/cms/game/${params.id}/files`, params.file)
        .then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["games", "game"] });
      }
    }
  );
};

export default useGameFileMutation;
