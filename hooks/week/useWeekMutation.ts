import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWeek, Week, MutationObserverResult } from "@app/types";
import { cms } from "@app/services";

const useWeekMutation = (
  relatedGame: number
): MutationObserverResult<Week, CreateWeek> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (week: CreateWeek) => await cms.weekService.createWeek(week),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["week", relatedGame]);
      }
    }
  );
};

export default useWeekMutation;
