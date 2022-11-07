import React, { FC, useState } from "react";
import { Wrapper } from "@/components/Wrappers";
import {
  Container,
  MediaQuery,
  Title,
  Card,
  Group,
  Text,
  useMantineColorScheme,
  Switch,
  Avatar,
  ActionIcon
} from "@mantine/core";
import { users } from "@/lib/demo/users/user";
import { getFullName } from "@/utils/user";
import { IconEdit } from "@tabler/icons";
import { EditProfile } from "@/modals";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

interface TextGroupProps {
  title: string;
  text: string;
}

export default withPageAuthRequired(function Settings(): JSX.Element {
  const activeUser = users[1];
  const isDarkScheme = useMantineColorScheme().colorScheme === "dark";
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEditModalVisibility = (): void => setEditModalVisible((v) => !v);

  const TextGroup: FC<TextGroupProps> = ({ title, text }) => (
    <Group my="md" position="apart">
      <Text size="lg" weight={500}>
        {title}
      </Text>
      <Text size="lg">{text}</Text>
    </Group>
  );

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Innstillinger
        </Title>
      </MediaQuery>
      <Container sx={{ position: "relative" }}>
        <Card radius="md" shadow="md" p="lg" m="md">
          <Title order={3}>Profilinformasjon</Title>
          <ActionIcon
            size="xl"
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleEditModalVisibility}
          >
            <IconEdit size={30} />
          </ActionIcon>
          <Group position="apart" mt="md">
            <div style={{ width: "40%" }}>
              <TextGroup title="Navn" text={getFullName(activeUser)} />
              <TextGroup title="E-post" text={activeUser.email} />
              <TextGroup
                title="Telefon"
                text={String(activeUser.phoneNumber)}
              />
            </div>
            <Avatar src={activeUser.profilePictureUrl} size={150} />
          </Group>
        </Card>
        <Card radius="md" shadow="md" p="lg" m="md">
          <Title order={3}>Varslinger</Title>
          <div style={{ width: "60%" }}>
            <Switch
              label="Ønsker å motta varslinger om oppgaver"
              size="lg"
              color={isDarkScheme ? "yellow" : "dark"}
              my="md"
            />
            <Switch
              label="Ønsker å motta varslinger om spill"
              size="lg"
              color={isDarkScheme ? "yellow" : "dark"}
              my="md"
            />
          </div>
        </Card>
      </Container>
      <EditProfile
        user={activeUser}
        isOpen={editModalVisible}
        onClose={handleEditModalVisibility}
      />
    </Wrapper>
  );
});
