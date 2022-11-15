import { common } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Idea } from "@app/types";

const useIdeasQuery = (): QueryObserverResult<Idea[]> =>
  useQuery({
    queryKey: ["ideas"],
    queryFn: common.ideaService.getIdeas
  });

export default useIdeasQuery;
