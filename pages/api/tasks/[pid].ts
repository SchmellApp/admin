import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "@app/types";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Task>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "PATCH": {
      const task = await client.task.update(req.query.pid as string, req.body);
      return res.status(200).json(task);
    }
    case "GET": {
      const task = await client.task.get(req.query.pid as string);
      return res.status(200).json(task);
    }
    default: {
      return res.status(405).end();
    }
  }
});
