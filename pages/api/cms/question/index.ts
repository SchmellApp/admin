import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Question } from "@app/types";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Question[] | Question>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const questions = await client.question.getAll({
        relatedWeek: req.query.relatedWeek as string
      });
      return res.status(200).json(questions);
    }
    case "POST": {
      const question = await client.question.create(req.body);
      return res.status(201).json(question);
    }
    default: {
      return res.status(405).end();
    }
  }
});
