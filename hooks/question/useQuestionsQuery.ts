import { cms } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Question } from "@app/types";

const useQuestionsQuery = (
  relatedWeek: number
): QueryObserverResult<Question[]> =>
  useQuery(
    ["questions", relatedWeek],
    async () => await cms.questionService.getQuestions({ relatedWeek }),
    {
      enabled: !(relatedWeek === 0)
    }
  );

export default useQuestionsQuery;
