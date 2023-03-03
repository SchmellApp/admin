import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@app/types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "GET": {
      const response = await axiosClient.get(
        `/users/${req.query.pid as string}/`
      );
      return res.status(200).json(response.data);
    }
    case "PATCH": {
      const response = await axiosClient.patch(
        `/users/${req.query.pid as string}/`,
        req.body
      );
      return res.status(200).json(response.data);
    }
    default: {
      return res.status(405).end();
    }
  }
});
