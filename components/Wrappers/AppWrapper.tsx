import React, { ReactNode, useRef } from "react";
import { AppShell } from "@mantine/core";
import { Navbar, Header } from "@app/components";
import { useModal } from "@app/hooks";

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps): JSX.Element => {
  const { onOpen, isOpen, onClose } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={<Navbar opened={isOpen} wrapperRef={ref} />}
      header={
        <Header
          opened={isOpen}
          handleNavbarToggle={isOpen ? onClose : onOpen}
        />
      }
      navbarOffsetBreakpoint={"sm"}
      ref={ref}
    >
      {children}
    </AppShell>
  );
};

export default AppWrapper;
