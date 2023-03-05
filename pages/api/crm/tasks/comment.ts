import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Comment } from "@app/types";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Comment[] | Comment>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "GET": {
      const response = await axiosClient.get(`/crm/tasks/comment/`, {
        params: {
          relatedTask: req.query.relatedTask
        }
      });
      return res.status(200).json(response.data);
    }
    case "POST": {
      const response = await axiosClient.post(`/crm/tasks/comment/`, req.body);
      return res.status(201).json(response.data);
    }
    default:
      return res.status(405).end();
  }
});
