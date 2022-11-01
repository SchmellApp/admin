import React, { FC } from "react";
import {
  Group,
  Header as MantineHeader,
  ActionIcon,
  useMantineColorScheme,
  Image,
  Title,
  MediaQuery,
  Burger
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import { useRouter } from "next/router";
import { getParsedTitle } from "../../utils/path";

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

  return (
    <MantineHeader height={60}>
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
          <Title order={2}>{getParsedTitle(pathname)}</Title>
        </MediaQuery>
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
      </Group>
    </MantineHeader>
  );
};

export default Header;
