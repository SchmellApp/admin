import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Week } from "@app/types";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Week[] | Week>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "GET": {
      const response = await axiosClient.get(`/cms/week/`, {
        params: {
          relatedGame: req.query.relatedGame as string
        }
      });
      return res.status(200).json(response.data);
    }
    case "POST": {
      const response = await axiosClient.post(`/cms/week/`, req.body);
      return res.status(201).json(response.data);
    }
    default:
      return res.status(405).end();
  }
});
