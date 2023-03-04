import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import axios from "axios";

const useDeleteGameMutation = (): MutationObserverResult<void, string> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) =>
      await axios.delete(`/api/cms/game/${id}`).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["games"] });
      }
    }
  );
};

export default useDeleteGameMutation;
