import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, User } from "@app/types";
import axios from "axios";

const useSelfQuery = (): QueryObserverResult<User> => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["self", user?.sub],
    queryFn: async () =>
      await axios
        .get(`/api/users/find/?auth0Id=${user?.sub}`)
        .then((res) => res.data),
    enabled: !(user === null) && !(user?.sub == null)
  });
};

export default useSelfQuery;
