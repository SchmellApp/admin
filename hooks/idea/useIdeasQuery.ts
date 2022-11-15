import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Idea } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useIdeasQuery = (): QueryObserverResult<Idea[]> =>
  useQuery({
    queryKey: ["ideas"],
    queryFn: schmellClient.idea.getAll
  });

export default useIdeasQuery;
