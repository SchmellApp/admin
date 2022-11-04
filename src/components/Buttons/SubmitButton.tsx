import { Button, Group, useMantineTheme } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import React, { FC } from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ label }) => {
  const isDarkScheme = useMantineTheme().colorScheme === "dark";
  return (
    <Group position="right" mt="lg">
      <Button
        type="submit"
        color={isDarkScheme ? "yellow" : "dark"}
        variant="light"
        rightIcon={<IconCirclePlus />}
      >
        {label}
      </Button>
    </Group>
  );
};

export default SubmitButton;
