import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import { Game } from "@app/types";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handler(
  req,
  res: NextApiResponse<Game>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const game = await client.game.get(req.query.pid as string);
      return res.status(200).json(game);
    }
    case "PATCH": {
      const game = await client.game.update(req.query.pid as string, req.body);
      return res.status(200).json(game);
    }
    case "DELETE": {
      await client.game.delete(req.query.pid as string);
      return res.status(204).end();
    }
    default:
      return res.status(405).end();
  }
});
