import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import axios from "axios";

const useDeleteWeekMutation = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (weekId: number) =>
      await axios.delete(`/api/cms/week/${weekId}`).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["week"]);
      }
    }
  );
};

export default useDeleteWeekMutation;
