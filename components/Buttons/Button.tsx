import { MantineSize, Button, useMantineColorScheme } from "@mantine/core";
import React, { FC, ReactNode } from "react";
import { IconPlus } from "@tabler/icons";

interface ButtonProps {
  label: string;
  onClick: () => void;
  size?: MantineSize;
  rightIcon?: ReactNode;
}
const SchmellButton: FC<ButtonProps> = ({
  label,
  onClick,
  size = "lg",
  rightIcon = <IconPlus />
}): JSX.Element => {
  const isDarkScheme = useMantineColorScheme().colorScheme === "dark";
  return (
    <Button
      onClick={onClick}
      color={isDarkScheme ? "yellow" : "dark"}
      variant="light"
      radius="md"
      size={size}
      rightIcon={rightIcon}
    >
      {label}
    </Button>
  );
};

export default SchmellButton;
