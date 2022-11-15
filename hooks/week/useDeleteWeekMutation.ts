import { cms } from "@app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";

const useDeleteWeekMutation = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (weekId: number) => await cms.weekService.deleteWeek(weekId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["week"]);
      }
    }
  );
};

export default useDeleteWeekMutation;
