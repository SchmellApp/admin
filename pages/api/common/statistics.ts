import { NextApiRequest, NextApiResponse } from "next";
import { StatisticsResponse } from "@app/types";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<StatisticsResponse>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  const statistics = await client.statistics.get();

  return res.status(200).json(statistics);
});
