import { Button, Group } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import React from "react";
import { useTheme } from "@app/hooks";

interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
}

const SubmitButton = ({ label, isLoading }: SubmitButtonProps): JSX.Element => {
  const { isDark } = useTheme();

  return (
    <Group position="right" mt="lg">
      <Button
        type="submit"
        color={isDark ? "yellow" : "dark"}
        variant="light"
        rightIcon={<IconCirclePlus />}
        loading={isLoading}
      >
        {label}
      </Button>
    </Group>
  );
};

export default SubmitButton;
