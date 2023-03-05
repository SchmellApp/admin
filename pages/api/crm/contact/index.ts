import { ContactFormPaginatedResponse } from "@app/types/contact";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { axiosClient } from "@app/lib";
import { ContactFormFilters } from "@app/types";

export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ContactFormPaginatedResponse>
) {
  const { accessToken } = await getAccessToken(req, res);

  if (accessToken === undefined) {
    return res.status(401).end();
  }

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  switch (req.method) {
    case "GET": {
      const response = await axiosClient.get("/crm/contact/", {
        params: req.query as ContactFormFilters
      });

      return res.status(200).json(response.data);
    }
    default: {
      return res.status(405).end();
    }
  }
});
