import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import SchmellClient from "@app/client/client";
import { NextApiResponse } from "next";
import { Idea, IdeaForm } from "@app/types";

export default withApiAuthRequired(async function handler(
  req,
  res: NextApiResponse<Idea[] | Idea>
) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "GET": {
      const ideas = await client.idea.getAll();
      return res.status(200).json(ideas);
    }
    case "POST": {
      const idea = await client.idea.create(req.body as IdeaForm);
      return res.status(201).json(idea);
    }
    default:
      return res.status(405).end();
  }
});
