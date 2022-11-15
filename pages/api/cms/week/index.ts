import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Week } from "@app/types";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req,
  res: NextApiResponse<Week[] | Week>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const weeks = await client.week.getAll({
        relatedGame: req.query.relatedGame as string
      });
      return res.status(200).json(weeks);
    }
    case "POST": {
      const week = await client.week.create(req.body);
      return res.status(201).json(week);
    }
    default:
      return res.status(405).end();
  }
});
