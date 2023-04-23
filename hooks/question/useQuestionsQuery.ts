import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Question } from "@app/types";
import axios from "axios";

const useQuestionsQuery = (
  weekNumbers: string[]
): QueryObserverResult<Question[]> =>
  useQuery(["questions", weekNumbers], async () => {
    const filters =
      weekNumbers.length > 0 ? `?weekNumbers=${weekNumbers.join(",")}` : "";
    return await axios
      .get(`/api/cms/question/${filters}`)
      .then((res) => res.data);
  });

export default useQuestionsQuery;
