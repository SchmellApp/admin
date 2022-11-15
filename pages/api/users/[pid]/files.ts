import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import SchmellClient from "@app/client/client";

export default withApiAuthRequired(async function handle(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const client = new SchmellClient(
    process.env.NEXT_PUBLIC_BASE_URL,
    accessToken
  );

  switch (req.method) {
    case "POST": {
      const user = await client.user.addProfilePicture(
        req.query.pid as string,
        req.body.file
      );
      return res.status(200).json(user);
    }
    default:
      return res.status(405).end();
  }
});
