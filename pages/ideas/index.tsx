import React, { useState } from "react";
import { Wrapper } from "../../src/components/Wrappers";
import {
  Group,
  MediaQuery,
  Title,
  Button,
  useMantineColorScheme
} from "@mantine/core";

export default function Ideas(): JSX.Element {
  const isDarkMode = useMantineColorScheme().colorScheme === "dark";

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Ideer
        </Title>
      </MediaQuery>
      <Group position="left">
        <Button variant="light" color={isDarkMode ? "yellow" : "dark"}>
          Jeg har en ny idé!
        </Button>
      </Group>
    </Wrapper>
  );
}
