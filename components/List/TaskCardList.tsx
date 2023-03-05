import { Task } from "@app/types";
import React, { FC } from "react";
import {
  Avatar,
  Card,
  Divider,
  Group,
  Pagination,
  Text,
  Badge,
  Skeleton
} from "@mantine/core";
import Link from "next/link";
import { getDifferenceInDays, toDateString, getColor } from "@app/utils";
import { useTheme } from "@app/hooks";

interface TaskCardListProps {
  data?: Task[];
  isLoading: boolean;
  maxPage?: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const TaskCardList: FC<TaskCardListProps> = ({
  data,
  isLoading,
  maxPage = 10,
  currentPage,
  onChangePage
}): JSX.Element => {
  const { isDark } = useTheme();

  return (
    <div>
      {isLoading || data == null ? (
        <Card shadow="sm" p="lg" radius="md" my="md">
          <Skeleton height={100} />
        </Card>
      ) : (
        data.map((task) => (
          <Card
            shadow="sm"
            p="lg"
            radius="md"
            component={Link}
            href={`/tasks/${task.id}`}
            my="md"
            key={task.id}
          >
            <Group position="left">
              <Avatar src={task.responsibleUser.profilePictureUrl} />
              <div style={{ marginLeft: "xl" }}>
                <Text>{task.title}</Text>
                <Text size="xs" color="dimmed">
                  {getDifferenceInDays(new Date(task.lastUpdated))}
                </Text>
              </div>
            </Group>
            <Divider mt="sm" mb="sm" />
            <Group position="left">
              <Text weight="bolder">Kategori:</Text>
              <Text>{task.category}</Text>
            </Group>
            <Group position="left" my="xs">
              <Text weight="bolder">Frist:</Text>
              <Text>{toDateString(new Date(task.deadline))}</Text>
            </Group>
            <Group position="left" my="xs">
              <Text weight="bolder">Prioritet:</Text>
              <Badge color={getColor(task.priority)} size="lg" fullWidth>
                {task.priority}
              </Badge>
            </Group>
          </Card>
        ))
      )}
      <Pagination
        total={maxPage}
        color={isDark ? "yellow" : "dark"}
        mt="md"
        page={currentPage}
        onChange={(page) => onChangePage(page)}
        grow
      />
    </div>
  );
};

export default TaskCardList;
