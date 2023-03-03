import { NextApiResponse } from "next";
import { Question } from "@app/types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Question>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "POST": {
      const response = await axiosClient.post(
        `/cms/question/${req.query.pid as string}/files`,
        req.body
      );
      return res.status(200).json(response.data);
    }
    default:
      return res.status(405).end();
  }
});
