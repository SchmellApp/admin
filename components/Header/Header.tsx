import React, { FC } from "react";
import {
  Group,
  Header as MantineHeader,
  ActionIcon,
  useMantineColorScheme,
  Image,
  Title,
  MediaQuery,
  Burger,
  Menu
} from "@mantine/core";
import {
  IconLogout,
  IconMoonStars,
  IconSettings,
  IconSun,
  IconUserCircle
} from "@tabler/icons";
import { useRouter } from "next/router";
import { toPageTitle } from "@app/utils";
import UserNav from "./UserNav";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import useSelfQuery from "@app/hooks/auth/useSelfQuery";

interface HeaderProps {
  opened: boolean;
  handleNavbarToggle: () => void;
}

const Header: FC<HeaderProps> = ({
  handleNavbarToggle,
  opened
}): JSX.Element => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { pathname } = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const { data: user } = useSelfQuery();

  return (
    <MantineHeader height={80}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <MediaQuery styles={{ display: "none" }} largerThan={"sm"}>
          <Burger
            opened={opened}
            onClick={handleNavbarToggle}
            size={"sm"}
            mr={"xl"}
          />
        </MediaQuery>
        <Image src="/logo.png" height={40} width={200} />
        <MediaQuery styles={{ display: "none" }} smallerThan={"sm"}>
          <Title order={2}>{toPageTitle(pathname)}</Title>
        </MediaQuery>
        <Group>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === "dark" ? (
              <IconSun size={16} />
            ) : (
              <IconMoonStars size={16} />
            )}
          </ActionIcon>
          <Menu position={isSmallScreen ? "left-start" : "bottom"} withArrow>
            <>
              {user !== undefined && (
                <Menu.Target>
                  {isSmallScreen ? (
                    <ActionIcon variant="default" size={30}>
                      <IconUserCircle />
                    </ActionIcon>
                  ) : (
                    <UserNav
                      userFullName={user.firstName + " " + user.lastName}
                      userAvatarUrl={user.profilePictureUrl ?? ""}
                      userEmailAddress={user.email}
                    />
                  )}
                </Menu.Target>
              )}
            </>
            <Menu.Dropdown>
              <Menu.Label>Bruker</Menu.Label>
              <Menu.Item
                icon={<IconSettings size={14} />}
                component={Link}
                href={"/settings"}
              >
                Innstillinger
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Handlinger</Menu.Label>
              <Menu.Item
                icon={<IconLogout size={14} />}
                component={Link}
                href="api/auth/logout/"
              >
                Logg ut
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default Header;
