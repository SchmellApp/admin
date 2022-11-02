import { TaskPriority } from "../types/task/priority";
import React, { ReactNode } from "react";
import { Badge } from "@mantine/core";

export const parsePriorityToBadge = (
  priority: TaskPriority,
  fullWidth?: boolean
): ReactNode => {
  switch (priority) {
    case TaskPriority.LOW:
      return (
        <Badge color="green" size="lg" fullWidth={fullWidth}>
          Lav
        </Badge>
      );
    case TaskPriority.MEDIUM:
      return (
        <Badge color="yellow" size="lg" fullWidth={fullWidth}>
          Medium
        </Badge>
      );
    case TaskPriority.HIGH:
      return (
        <Badge color="red" size="lg" fullWidth={fullWidth}>
          Høy
        </Badge>
      );
    default:
      return (
        <Badge color="green" size="lg" fullWidth={fullWidth}>
          Lav
        </Badge>
      );
  }
};
