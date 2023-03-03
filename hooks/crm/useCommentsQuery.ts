import { useQuery } from "@tanstack/react-query";
import { Comment, QueryObserverResult } from "@app/types";
import axios from "axios";

const useCommentsQuery = (
  relatedTask: string
): QueryObserverResult<Comment[]> =>
  useQuery(
    ["comments", relatedTask],
    async () =>
      await axios
        .get("/api/crm/tasks/comment", { params: { relatedTask } })
        .then((res) => res.data)
  );

export default useCommentsQuery;
