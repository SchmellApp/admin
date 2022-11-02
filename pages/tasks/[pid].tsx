import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "../../src/components/Wrappers";
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
import { tasks } from "../../src/lib/demo/tasks/task";
import { EditTask, CommentForm } from "../../src/components/Forms";
import { parseCategoryToUnderstandable } from "../../src/utils/category";
import { parsePriorityToBadge } from "../../src/utils/priority";
import { getFullName } from "../../src/utils/user";
import { comments } from "../../src/lib/demo/tasks/comments";
import { Comment } from "../../src/components/Comment/";

const Task = (): JSX.Element => {
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
                <Badge
                  size="lg"
                  rightSection={
                    parseCategoryToUnderstandable(task.category).icon
                  }
                >
                  {parseCategoryToUnderstandable(task.category).name}
                </Badge>
              </Group>
              <Group mt="md" position="apart">
                <Text>Prioritet:</Text>
                <Text>{parsePriorityToBadge(task.priority)}</Text>
              </Group>
              <Group mt={80} position="apart">
                <div>
                  <Text weight="bolder">Ansvarlig:</Text>
                  <Text>{getFullName(task.responsibleUser.id)}</Text>
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
};

export default Task;
