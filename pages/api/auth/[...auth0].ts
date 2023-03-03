import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      authorizationParams: {
        scope: "openid profile email",
        audience: process.env.NEXT_PUBLIC_AUDIENCE
      }
    });
  }
});
