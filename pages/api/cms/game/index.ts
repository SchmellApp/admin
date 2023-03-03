import { NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handler(
  req,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "GET": {
      const response = await axiosClient.get(`/cms/game`);
      return res.status(200).json(response.data);
    }
    case "POST": {
      const response = await axiosClient.post(`/cms/game`, req.body);
      return res.status(200).json(response.data);
    }
    default:
      return res.status(405).end();
  }
});
