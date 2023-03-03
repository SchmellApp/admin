import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, User } from "@app/types";
import axios from "axios";

const useUsersQuery = (): QueryObserverResult<User[]> =>
  useQuery(
    ["user"],
    async () => await axios.get("/api/users").then((res) => res.data)
  );

export default useUsersQuery;
