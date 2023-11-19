import React, { ReactNode } from "react";
import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useTheme } from "@app/hooks";

const RemoveButton = (onClick: () => void): ReactNode => {
  const { isDark } = useTheme();

  return (
    <ActionIcon
      size={"sm"}
      color={isDark ? "yellow" : "dark"}
      radius={"xl"}
      variant={"transparent"}
      onClick={onClick}
    >
      <IconX size={20} />
    </ActionIcon>
  );
};

export default RemoveButton;
