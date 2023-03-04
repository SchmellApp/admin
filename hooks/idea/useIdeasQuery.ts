import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Idea } from "@app/types";
import axios from "axios";

const useIdeasQuery = (): QueryObserverResult<Idea[]> =>
  useQuery({
    queryKey: ["ideas"],
    queryFn: async () =>
      await axios.get("/api/common/idea").then((res) => res.data)
  });

export default useIdeasQuery;
