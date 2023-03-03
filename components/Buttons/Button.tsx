import { MantineSize, Button } from "@mantine/core";
import React, { ReactNode } from "react";
import { IconPlus } from "@tabler/icons";
import { useTheme } from "@app/hooks";

interface ButtonProps {
  label: string;
  onClick: () => void;
  size?: MantineSize;
  rightIcon?: ReactNode;
}
const SchmellButton = ({
  label,
  onClick,
  size = "lg",
  rightIcon = <IconPlus />
}: ButtonProps): JSX.Element => {
  const { isDark } = useTheme();

  return (
    <Button
      onClick={onClick}
      color={isDark ? "yellow" : "dark"}
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
