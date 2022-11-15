import { StatisticsResponse } from "@app/types";
import axiosInstance from "../axios";

export const getStatistics = async (): Promise<StatisticsResponse> =>
  await axiosInstance.get(`/common/statistics/`).then((res) => res.data);
