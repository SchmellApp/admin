import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const response = await axiosClient.get("/users");

  return res.status(200).json(response.data);
});
