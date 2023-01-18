import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { axiosClient } from "@app/lib";

export default withApiAuthRequired(async function handle(req, res) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "POST": {
      const response = await axiosClient.post(
        `/users/${req.query.pid as string}/files/`,
        req.body.file
      );
      return res.status(200).json(response.data);
    }
    default:
      return res.status(405).end();
  }
});
