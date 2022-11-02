import { TaskCategory } from "../types/task/category";
import React, { ReactNode } from "react";
import {
  IconAd,
  IconCashBanknote,
  IconCode,
  IconDeviceGamepad2,
  IconPalette,
  IconQuestionMark
} from "@tabler/icons";

export const parseCategoryToUnderstandable = (
  category: TaskCategory
): {
  name: string;
  icon: ReactNode;
} => {
  switch (category) {
    case TaskCategory.DESIGN:
      return {
        name: "Design",
        icon: <IconPalette size={12} />
      };
    case TaskCategory.DEVELOPMENT:
      return {
        name: "Utvikling",
        icon: <IconCode size={12} />
      };
    case TaskCategory.GAMES:
      return {
        name: "Spill",
        icon: <IconDeviceGamepad2 size={12} />
      };
    case TaskCategory.MARKETING:
      return {
        name: "Markedsføring",
        icon: <IconAd size={12} />
      };
    case TaskCategory.ECONOMY:
      return {
        name: "Økonomi",
        icon: <IconCashBanknote size={12} />
      };
    default:
      return {
        name: "Annet",
        icon: <IconQuestionMark size={12} />
      };
  }
};
