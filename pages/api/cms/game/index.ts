import { NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handler(
  req,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const statistics = await client.game.getAll();
      return res.status(200).json(statistics);
    }
    case "POST": {
      const game = await client.game.create(req.body);
      return res.status(200).json(game);
    }
    default:
      return res.status(405).end();
  }
});
