import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Question } from "@app/types";
import axios from "axios";

const useQuestionsQuery = (
  weekNumbers: string[],
  relatedGame?: string
): QueryObserverResult<Question[]> =>
  useQuery(
    ["questions", weekNumbers],
    async () => {
      const weekNumbersFilter =
        weekNumbers.length > 0
          ? {
              weekNumbers: weekNumbers.join(",")
            }
          : undefined;
      return await axios
        .get(`/api/cms/question/`, {
          params: {
            weekNumbersFilter,
            relatedGame
          }
        })
        .then((res) => res.data);
    },
    {
      enabled: relatedGame !== undefined
    }
  );

export default useQuestionsQuery;
