import React, { FC, ReactNode } from "react";
import { Modal, Title, useMantineTheme } from "@mantine/core";

interface ModalBaseProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ModalBase: FC<ModalBaseProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const isDarkScheme = useMantineTheme().colorScheme === "dark";
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      centered
      size="lg"
      padding="xl"
      radius="md"
      sx={{
        ".mantine-Modal-header": {
          marginBottom: 0
        }
      }}
    >
      <Title order={3} color={isDarkScheme ? "white" : "dark"}>
        {title}
      </Title>
      {children}
    </Modal>
  );
};

export default ModalBase;
