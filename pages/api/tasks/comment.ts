import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Comment } from "@app/types";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Comment[] | Comment>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const comments = await client.comment.getAll({
        relatedTask: req.query.relatedTask as string
      });
      return res.status(200).json(comments);
    }
    case "POST": {
      const comment = await client.comment.create(req.body);
      return res.status(201).json(comment);
    }
    default:
      return res.status(405).end();
  }
});
