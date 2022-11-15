import { useRouter } from "next/router";
import React from "react";
import { Wrapper, EditTask, CommentForm, CommentBox } from "@app/components";
import {
  Breadcrumbs,
  Title,
  Anchor,
  SimpleGrid,
  Text,
  Card,
  Group,
  Badge,
  Avatar,
  ScrollArea,
  Stack
} from "@mantine/core";
import { getIcon, getColor } from "@app/utils";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useCommentsQuery, useTaskQuery } from "@app/hooks";

export default withPageAuthRequired(function Task(): JSX.Element {
  const router = useRouter();
  const { pid } = router.query;

  const { data: task } = useTaskQuery(pid as string);
  const { data: taskComments } = useCommentsQuery(pid as string);

  return (
    <Wrapper>
      {task != null && (
        <>
          <div>
            <Title order={2} mt="md">
              {task.title}
            </Title>
            <Breadcrumbs>
              <Anchor href="/tasks" color="dimmed" size="sm">
                Oppgaver
              </Anchor>
              <Anchor href={`/tasks/${pid as string}`} color="dimmed" size="sm">
                ID: {task.id}
              </Anchor>
            </Breadcrumbs>
          </div>
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[
              {
                maxWidth: 600,
                cols: 1,
                spacing: "sm"
              }
            ]}
            mt="md"
          >
            <Card p="md" shadow="sm">
              <Title order={3}>Beskrivelse</Title>
              <Text>{task.description}</Text>
            </Card>
            <Card p="md" shadow="sm">
              <Title order={3}>Informasjon</Title>
              <EditTask task={task} />
              <Group mt="md" position="apart">
                <Text>Kategori:</Text>
                <Badge size="lg" rightSection={getIcon(task.category)}>
                  {task.category}
                </Badge>
              </Group>
              <Group mt="md" position="apart">
                <Text>Prioritet:</Text>
                <Badge size="lg" color={getColor(task.priority)}>
                  {task.priority}
                </Badge>
              </Group>
              <Group mt={80} position="apart">
                <div>
                  <Text weight="bolder">Ansvarlig:</Text>
                  <Text>{task.responsibleUser.fullName}</Text>
                </div>
                <Avatar
                  src={task.responsibleUser.profilePictureUrl}
                  size="lg"
                />
              </Group>
            </Card>
          </SimpleGrid>
          <Card p="md" shadow="sm" mt="md">
            <Title order={3}>Kommentarer</Title>
            <ScrollArea
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
                borderRadius: theme.radius.md,
                height: 250
              })}
              mt="md"
              p="lg"
            >
              <Stack spacing="md">
                {taskComments !== undefined && (
                  <>
                    {taskComments.map((comment) => (
                      <CommentBox comment={comment} key={comment.id} />
                    ))}
                  </>
                )}
              </Stack>
            </ScrollArea>
            <CommentForm currentTask={task} />
          </Card>
        </>
      )}
    </Wrapper>
  );
});
