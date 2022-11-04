import { TaskCategory } from "@/enums/task";
import React, { ReactNode } from "react";
import {
  IconAd,
  IconCashBanknote,
  IconCode,
  IconDeviceGamepad2,
  IconPalette,
  IconQuestionMark
} from "@tabler/icons";

export const getIcon = (category: TaskCategory): ReactNode => {
  switch (category) {
    case TaskCategory.DESIGN:
      return <IconPalette size={12} />;
    case TaskCategory.DEVELOPMENT:
      return <IconCode size={12} />;
    case TaskCategory.GAMES:
      return <IconDeviceGamepad2 size={12} />;
    case TaskCategory.MARKETING:
      return <IconAd size={12} />;
    case TaskCategory.ECONOMY:
      return <IconCashBanknote size={12} />;
    default:
      return <IconQuestionMark size={12} />;
  }
};
