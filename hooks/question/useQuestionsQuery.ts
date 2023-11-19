import { useQuery } from "@tanstack/react-query";
import {
  QueryObserverResult,
  QuestionFilters,
  QuestionPaginatedResponse
} from "@app/types";
import axios from "axios";

const useQuestionsQuery = ({
  questionSearch,
  weekNumbers,
  questionType,
  pageSize = 50,
  page,
  relatedGame
}: QuestionFilters): QueryObserverResult<QuestionPaginatedResponse> =>
  useQuery(
    ["questions", weekNumbers, questionType, questionSearch, pageSize, page],
    async () => {
      const weekNumbersFilter =
        weekNumbers.length > 0
          ? {
              weekNumbers: weekNumbers.join(",")
            }
          : undefined;
      const questionTypeFilter =
        questionType !== ""
          ? {
              questionType
            }
          : undefined;
      const questionSearchFilter =
        questionSearch !== ""
          ? {
              questionSearch
            }
          : undefined;
      return await axios
        .get(`/api/cms/question/`, {
          params: {
            relatedGame,
            page,
            pageSize: 50,
            ...weekNumbersFilter,
            ...questionTypeFilter,
            ...questionSearchFilter
          }
        })
        .then((res) => res.data);
    },
    {
      enabled: relatedGame !== undefined
    }
  );

export default useQuestionsQuery;
