import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handler(
  req,
  res: NextApiResponse<void>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "DELETE": {
      await axiosClient.delete(`/common/idea/${req.query.pid as string}/`);
      return res.status(204).end();
    }
    default:
      return res.status(405).end();
  }
});
