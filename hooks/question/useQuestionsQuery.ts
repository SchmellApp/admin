import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Question } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useQuestionsQuery = (
  relatedWeek: string
): QueryObserverResult<Question[]> =>
  useQuery(
    ["questions", relatedWeek],
    async () => await schmellClient.question.getAll({ relatedWeek }),
    {
      enabled: !(relatedWeek === "")
    }
  );

export default useQuestionsQuery;
