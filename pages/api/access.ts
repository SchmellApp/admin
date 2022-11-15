import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function access(req, res) {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ["read:schmell"]
  });

  res.status(200).json({ accessToken });
});
