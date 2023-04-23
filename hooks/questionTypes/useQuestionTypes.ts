import { QueryObserverResult, QuestionType } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useQuestionTypes = (name?: string): QueryObserverResult<QuestionType[]> =>
  useQuery(
    ["questionTypes", name],
    async () =>
      await axios
        .get(`/api/cms/question/type/?name=${name ?? ""}`)
        .then((res) => res.data)
  );

export default useQuestionTypes;
