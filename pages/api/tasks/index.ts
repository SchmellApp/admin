import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Task, TaskFilters } from "@app/types";
import { NextApiRequest, NextApiResponse } from "next";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Task | Task[]>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const task = await client.task.getAll(req.query as TaskFilters);
      return res.status(200).json(task);
    }
    case "POST": {
      const task = await client.task.create(req.body);
      return res.status(201).json(task);
    }
    default:
      return res.status(405).end();
  }
});
