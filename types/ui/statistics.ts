import { ReactNode } from "react";

export interface DayStatisticsRows {
  gameName: string;
  count: number;
  userCount: number;
}

export interface ActionElement {
  name: string;
  right: string | ReactNode;
  href: string;
}
