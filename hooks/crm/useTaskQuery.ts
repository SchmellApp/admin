import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Task } from "@app/types";
import axios from "axios";

const useTaskQuery = (id: string): QueryObserverResult<Task> =>
  useQuery(
    ["task", id],
    async () => await axios.get(`/api/crm/tasks/${id}`).then((res) => res.data)
  );

export default useTaskQuery;
