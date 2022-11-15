import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Question } from "@app/types";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Question[]>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "POST": {
      const questions = await client.question.createMany(req.body);
      return res.status(201).json(questions);
    }
    default:
      return res.status(405).end();
  }
});
