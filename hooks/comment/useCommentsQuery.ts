import { task } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { Comment, QueryObserverResult } from "@app/types";

const useCommentsQuery = (
  relatedTask: string
): QueryObserverResult<Comment[]> =>
  useQuery(
    ["comments", relatedTask],
    async () => await task.commentService.getComments({ relatedTask })
  );

export default useCommentsQuery;
