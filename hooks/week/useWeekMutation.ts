import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWeek, Week, MutationObserverResult } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useWeekMutation = (
  relatedGame: string
): MutationObserverResult<Week, CreateWeek> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (week: CreateWeek) => await schmellClient.week.create(week),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["week", relatedGame]);
      }
    }
  );
};

export default useWeekMutation;
