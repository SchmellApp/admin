import { NextApiResponse } from "next";
import { Question } from "@app/types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
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
    case "POST": {
      const question = await client.question.addPicture(
        req.query.pid as string,
        req.body
      );
      return res.status(200).json(question);
    }
    default:
      return res.status(405).end();
  }
});
