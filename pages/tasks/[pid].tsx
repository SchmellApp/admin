import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "@/components/Wrappers";
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
import { tasks } from "@/lib/demo/tasks/task";
import { EditTask, CommentForm } from "@/components/Forms";
import { getFullName } from "@/utils/user";
import { comments } from "@/lib/demo/tasks/comments";
import { Comment } from "@/components/Comment/";
import { getColor } from "@/utils/color";
import { getIcon } from "@/utils/task";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function Task(): JSX.Element {
  const router = useRouter();
  const { pid } = router.query;

  // TODO: Fetch task from database based on pid
  const task = tasks.find((task) => task.id === Number(pid));
  const taskComments = comments.filter(
    (comment) => comment.relatedTask === task?.id
  );

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
                {task.id}
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
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
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
                  <Text>{getFullName(task.responsibleUser)}</Text>
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
                {taskComments.map((comment) => (
                  <Comment comment={comment} key={comment.id} />
                ))}
              </Stack>
            </ScrollArea>
            <CommentForm />
          </Card>
        </>
      )}
    </Wrapper>
  );
});
