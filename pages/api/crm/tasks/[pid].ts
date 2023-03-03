import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "@app/types";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "PATCH": {
      const response = await axiosClient.patch(
        `/crm/tasks/${req.query.pid as string}/`,
        req.body
      );
      return res.status(200).json(response.data);
    }
    case "GET": {
      const response = await axiosClient.get(
        `/crm/tasks/${req.query.pid as string}/`
      );
      return res.status(200).json(response.data);
    }
    default: {
      return res.status(405).end();
    }
  }
});
