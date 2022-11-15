import React, { FC, ReactNode, useRef, useState } from "react";
import { AppShell } from "@mantine/core";
import { Navbar, Header } from "@app/components";

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = (): void => setOpened((o) => !o);

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={<Navbar opened={opened} wrapperRef={ref} />}
      header={<Header opened={opened} handleNavbarToggle={handleOpen} />}
      navbarOffsetBreakpoint={"sm"}
      ref={ref}
    >
      {children}
    </AppShell>
  );
};

export default AppWrapper;
