import React from "react";
import { Modal, Button, Title, Group } from "@mantine/core";

interface ActionDialogProps {
  title: string;
  actions: Array<{
    label: string;
    color: string;
    onClick: () => Promise<void> | void;
    isLoading?: boolean;
  }>;
  isDialogOpen: boolean;
  handleClose: () => void;
}

const ActionDialog = ({
  isDialogOpen,
  actions,
  title,
  handleClose
}: ActionDialogProps): JSX.Element => (
  <Modal
    opened={isDialogOpen}
    onClose={handleClose}
    centered
    size="lg"
    radius="lg"
    transitionProps={{ transition: "slide-right" }}
    sx={{
      ".mantine-Modal-header": {
        marginBottom: 0
      }
    }}
  >
    <Title order={3} align="center">
      {title}
    </Title>
    <Group position="center" my="md">
      {actions.map((action, idx) => (
        <Button
          key={idx}
          color={action.color}
          onClick={() => {
            void action.onClick();
          }}
          variant="outline"
          loading={action.isLoading}
        >
          {action.label}
        </Button>
      ))}
    </Group>
  </Modal>
);

export default ActionDialog;
