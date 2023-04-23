import { MantineSize, Button } from "@mantine/core";
import React, { ReactNode } from "react";
import { IconPlus } from "@tabler/icons";
import { useTheme } from "@app/hooks";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  size?: MantineSize;
  rightIcon?: ReactNode;
  variant?:
    | "light"
    | "gradient"
    | "filled"
    | "outline"
    | "white"
    | "default"
    | "subtle";
  href?: string;
}
const SchmellButton = ({
  label,
  onClick,
  size = "lg",
  rightIcon = <IconPlus />,
  variant = "light",
  href
}: ButtonProps): JSX.Element => {
  const { isDark } = useTheme();

  return (
    <Button
      component={href != null ? "a" : "button"}
      href={href}
      onClick={onClick}
      color={isDark ? "yellow" : "dark"}
      variant={variant}
      radius="md"
      size={size}
      rightIcon={rightIcon}
    >
      {label}
    </Button>
  );
};

export default SchmellButton;
