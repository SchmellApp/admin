import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Question } from "@app/types";
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
    case "GET": {
      const response = await axiosClient.get(
        `/cms/question/${req.query.pid as string}/`
      );
      return res.status(200).json(response.data);
    }
    case "PATCH": {
      const response = await axiosClient.patch(
        `/cms/question/${req.query.pid as string}/`,
        req.body
      );
      return res.status(200).json(response.data);
    }
    case "DELETE": {
      await axiosClient.delete(`/cms/question/${req.query.pid as string}/`);
      return res.status(204).end();
    }
    default:
      return res.status(405).end();
  }
});
