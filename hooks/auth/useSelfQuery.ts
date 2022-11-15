import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, User } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useSelfQuery = (): QueryObserverResult<User> => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["self", user?.sub],
    queryFn: async () => await schmellClient.user.getByAuth0Id(user?.sub ?? "")
  });
};

export default useSelfQuery;
