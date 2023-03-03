import React, { ReactNode } from "react";
import { Modal, Title } from "@mantine/core";
import { useTheme } from "@app/hooks";

interface ModalBaseProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ModalBase = ({
  isOpen,
  onClose,
  title,
  children
}: ModalBaseProps): JSX.Element => {
  const { isDark } = useTheme();
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
      <Title order={3} color={isDark ? "white" : "dark"}>
        {title}
      </Title>
      {children}
    </Modal>
  );
};

export default ModalBase;
