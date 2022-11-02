import React, { FC } from "react";
import { Modal, Button, Title, Group } from "@mantine/core";

interface ActionDialogProps {
  title: string;
  actions: Array<{
    label: string;
    color: string;
    onClick: () => void;
  }>;
  isDialogOpen: boolean;
  handleClose: () => void;
}

const ActionDialog: FC<ActionDialogProps> = ({
  isDialogOpen,
  actions,
  title,
  handleClose
}): JSX.Element => (
  <Modal
    opened={isDialogOpen}
    onClose={handleClose}
    centered
    size="lg"
    radius="lg"
    transition="slide-right"
    sx={(theme) => ({
      ".mantine-Modal-header": {
        marginBottom: 0
      }
    })}
  >
    <Title order={3} align="center">
      {title}
    </Title>
    <Group position="center" my="md">
      {actions.map((action, idx) => (
        <Button
          key={idx}
          color={action.color}
          onClick={action.onClick}
          variant="outline"
        >
          {action.label}
        </Button>
      ))}
    </Group>
  </Modal>
);

export default ActionDialog;
