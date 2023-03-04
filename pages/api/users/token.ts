import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  switch (req.method) {
    case "GET": {
      return res.status(200).json({ accessToken });
    }
    default:
      return res.status(405).end();
  }
});
