import { useQuery } from "@tanstack/react-query";
import { Comment, QueryObserverResult } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useCommentsQuery = (
  relatedTask: string
): QueryObserverResult<Comment[]> =>
  useQuery(
    ["comments", relatedTask],
    async () => await schmellClient.comment.getAll({ relatedTask })
  );

export default useCommentsQuery;
