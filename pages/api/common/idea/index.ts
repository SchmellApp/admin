import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Idea, IdeaForm } from "@app/types";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handler(
  req,
  res: NextApiResponse<Idea[] | Idea>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "GET": {
      const response = await axiosClient.get("/common/idea/");
      return res.status(200).json(response.data);
    }
    case "POST": {
      const response = await axiosClient.post(
        "/common/idea/",
        req.body as IdeaForm
      );
      return res.status(201).json(response.data);
    }
    default:
      return res.status(405).end();
  }
});
