import { useQuery } from "@tanstack/react-query";
import {
  QueryObserverResult,
  QuestionFilters,
  QuestionPaginatedResponse
} from "@app/types";
import axios from "axios";

const useQuestionsQuery = ({
  questionSearch,
  questionType,
  pageSize = 50,
  page,
  relatedGame,
  hasDislikes,
  dislikesGreaterThan
}: QuestionFilters): QueryObserverResult<QuestionPaginatedResponse> =>
  useQuery(
    [
      "questions",
      questionType,
      questionSearch,
      pageSize,
      page,
      hasDislikes,
      dislikesGreaterThan
    ],
    async () => {
      return await axios
        .get(`/api/cms/question/`, {
          params: {
            relatedGame,
            page,
            pageSize: 50,
            hasDislikes,
            dislikesGreaterThan,
            questionSearch,
            questionType
          }
        })
        .then((res) => res.data);
    },
    {
      enabled: relatedGame !== undefined
    }
  );

export default useQuestionsQuery;
