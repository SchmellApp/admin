import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Question } from "@app/types";
import axios from "axios";

const useQuestionsQuery = (
  relatedWeek: string
): QueryObserverResult<Question[]> =>
  useQuery(
    ["questions", relatedWeek],
    async () =>
      await axios
        .get(`/api/cms/question/?relatedWeek=${relatedWeek}`)
        .then((res) => res.data),
    {
      enabled: !(relatedWeek === "")
    }
  );

export default useQuestionsQuery;
