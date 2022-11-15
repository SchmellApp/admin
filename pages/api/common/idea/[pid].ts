import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiResponse } from "next";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handler(
  req,
  res: NextApiResponse<void>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "DELETE": {
      await client.idea.delete(req.query.pid as string);
      return res.status(204).end();
    }
    default:
      return res.status(405).end();
  }
});
