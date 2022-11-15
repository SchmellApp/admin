import { NextApiRequest, NextApiResponse } from "next";
import SchmellClient from "@app/client/client";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  const users = await client.user.getAll();

  return res.status(200).json(users);
});
