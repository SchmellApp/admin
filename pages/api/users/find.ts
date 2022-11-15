import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@app/types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const user = await client.user.getByAuth0Id(req.query.auth0Id as string);
      return res.status(200).json(user);
    }
    default:
      return res.status(405).end();
  }
});
