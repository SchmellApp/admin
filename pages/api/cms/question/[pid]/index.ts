import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Question } from "@app/types";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Question>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const question = await client.question.get(req.query.pid as string);
      return res.status(200).json(question);
    }
    case "PATCH": {
      const question = await client.question.update(
        req.query.pid as string,
        req.body
      );
      return res.status(200).json(question);
    }
    case "DELETE": {
      await client.question.delete(req.query.pid as string);
      return res.status(204).end();
    }
    default:
      return res.status(405).end();
  }
});
