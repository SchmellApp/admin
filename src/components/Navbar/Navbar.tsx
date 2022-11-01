import { nav } from "../../constants/nav";
import {
  Button,
  Stack,
  useMantineColorScheme,
  Navbar as MantineNavbar
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import User from "./User";
import React, { FC } from "react";

interface NavbarProps {
  opened: boolean;
}

const Navbar: FC<NavbarProps> = ({ opened }) => {
  const { pathname } = useRouter();
  const isActive = (href: string) => pathname === href;

  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <MantineNavbar
      width={{ base: 300 }}
      sx={{ justifyContent: "space-between" }}
      hiddenBreakpoint="sm"
      hidden={!opened}
    >
      <MantineNavbar.Section mt="xl">
        <Stack>
          {nav.map((item) => (
            <Link href={item.href} key={item.href} passHref>
              <Button
                leftIcon={item.icon}
                variant={isActive(item.href) ? "light" : "subtle"}
                size="lg"
                radius="xs"
                sx={(theme) => ({
                  ".mantine-Button-inner": {
                    justifyContent: "flex-start"
                  },
                  ".mantine-Button-label": {
                    marginLeft: theme.spacing.md
                  }
                })}
                fullWidth
                color={isDark ? "yellow" : "dark"}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Stack>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <User
          userFullName={"Francin Vincent"}
          userAvatarUrl={""}
          userEmailAddress={"francin.vinc@gmail.com"}
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
