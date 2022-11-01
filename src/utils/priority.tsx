import { TaskPriority } from "../types/task/priority";
import React, { ReactNode } from "react";
import { Badge } from "@mantine/core";

export const parsePriorityToBadge = (priority: TaskPriority): ReactNode => {
  switch (priority) {
    case TaskPriority.LOW:
      return (
        <Badge color="green" size="lg">
          Lav
        </Badge>
      );
    case TaskPriority.MEDIUM:
      return (
        <Badge color="yellow" size="lg">
          Medium
        </Badge>
      );
    case TaskPriority.HIGH:
      return (
        <Badge color="red" size="lg">
          Høy
        </Badge>
      );
    default:
      return (
        <Badge color="green" size="lg">
          Lav
        </Badge>
      );
  }
};
