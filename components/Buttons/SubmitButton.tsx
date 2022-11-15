import { Button, Group, useMantineTheme } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import React, { FC } from "react";

interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ label, isLoading }) => {
  const isDarkScheme = useMantineTheme().colorScheme === "dark";
  return (
    <Group position="right" mt="lg">
      <Button
        type="submit"
        color={isDarkScheme ? "yellow" : "dark"}
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
