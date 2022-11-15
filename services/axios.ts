import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

axiosInstance.interceptors.request.use(async function (config) {
  const response: { accessToken: string } = await axios
    .get("/api/access")
    .then((res) => res.data);
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${response.accessToken}`;
  return config;
});

export default axiosInstance;
