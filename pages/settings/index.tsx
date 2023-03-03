import React, { useEffect, useState } from "react";
import { Wrapper } from "@app/components";
import {
  Container,
  MediaQuery,
  Title,
  Card,
  Group,
  Text,
  Switch,
  Avatar,
  ActionIcon
} from "@mantine/core";
import { getFullName } from "@app/utils";
import { IconEdit } from "@tabler/icons";
import { EditProfile } from "@app/modals";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  useModal,
  useSelfQuery,
  useTheme,
  useUpdateMutation
} from "@app/hooks";

interface TextGroupProps {
  title: string;
  text: string;
}

export default withPageAuthRequired(function Settings(): JSX.Element {
  const { data: activeUser } = useSelfQuery();
  const updateUser = useUpdateMutation(String(activeUser?.id) ?? "");
  const { isDark } = useTheme();
  const { isOpen, onOpen, onClose } = useModal();

  const [alerts, setAlerts] = useState({
    alertsForTasks: activeUser?.alertsForTasks ?? false,
    alertsForDeadlines: activeUser?.alertsForDeadlines ?? false
  });

  useEffect(() => {
    if (activeUser !== undefined) {
      setAlerts({
        alertsForTasks: activeUser.alertsForTasks,
        alertsForDeadlines: activeUser.alertsForDeadlines
      });
    }
  }, [activeUser]);

  const handleChange = (prop: keyof typeof alerts) => (value: boolean) => {
    setAlerts({ ...alerts, [prop]: value });
    updateUser.mutate({
      ...alerts,
      [prop]: value
    });
  };

  const TextGroup = ({ title, text }: TextGroupProps): JSX.Element => (
    <Group my="md" position="apart">
      <Text size="lg" weight={500}>
        {title}
      </Text>
      <Text size="lg">{text}</Text>
    </Group>
  );

  return (
    <Wrapper>
      {activeUser !== undefined && (
        <>
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
                onClick={onOpen}
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
                  color={isDark ? "yellow" : "dark"}
                  my="md"
                  checked={alerts.alertsForTasks}
                  onChange={() =>
                    handleChange("alertsForTasks")(!alerts.alertsForTasks)
                  }
                />
                <Switch
                  label="Ønsker å motta varslinger om spill"
                  size="lg"
                  color={isDark ? "yellow" : "dark"}
                  my="md"
                  checked={alerts.alertsForDeadlines}
                  onChange={() =>
                    handleChange("alertsForDeadlines")(
                      !alerts.alertsForDeadlines
                    )
                  }
                />
              </div>
            </Card>
          </Container>
          <EditProfile user={activeUser} isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </Wrapper>
  );
});
