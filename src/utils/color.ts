import { TaskPriority } from "@/enums/task";
import { MantineColor } from "@mantine/core";

export const getColor = (color: TaskPriority): MantineColor => {
  switch (color) {
    case TaskPriority.LOW:
      return "green";
    case TaskPriority.MEDIUM:
      return "yellow";
    case TaskPriority.HIGH:
      return "red";
    default:
      return "blue";
  }
};
