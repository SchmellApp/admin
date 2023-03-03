import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Task, TaskFilters, TaskPaginatedResponse } from "@app/types";
import { NextApiRequest, NextApiResponse } from "next";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Task | TaskPaginatedResponse>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "GET": {
      const response = await axiosClient.get("/tasks/", {
        params: req.query as TaskFilters
      });
      return res.status(200).json(response.data);
    }
    case "POST": {
      const response = await axiosClient.post("/tasks/", req.body);
      return res.status(201).json(response.data);
    }
    default:
      return res.status(405).end();
  }
});
