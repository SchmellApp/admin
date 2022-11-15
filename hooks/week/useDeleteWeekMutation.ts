import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useDeleteWeekMutation = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (weekId: number) => await schmellClient.week.delete(String(weekId)),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["week"]);
      }
    }
  );
};

export default useDeleteWeekMutation;
