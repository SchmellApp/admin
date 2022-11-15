import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function access(req, res) {
  const { accessToken } = await getAccessToken(req, res);

  res.json({ accessToken });
});
