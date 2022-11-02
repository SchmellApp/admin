import { Task } from "../../types/task";
import React, { FC } from "react";
import {
  Avatar,
  Card,
  Divider,
  Group,
  Pagination,
  Text,
  Badge,
  useMantineColorScheme
} from "@mantine/core";
import Link from "next/link";
import { getDifferenceInDays, toDateString } from "../../utils/date";
import { getColor } from "../../utils/color";

interface CardListProps {
  tableData: Task[];
}

const CardList: FC<CardListProps> = ({ tableData }): JSX.Element => {
  const isDarkScheme = useMantineColorScheme().colorScheme === "dark";

  return (
    <div>
      {tableData.map((task) => (
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
                {getDifferenceInDays(task.lastUpdated)}
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
            <Text>{toDateString(task.deadline)}</Text>
          </Group>
          <Group position="left" my="xs">
            <Text weight="bolder">Prioritet:</Text>
            <Badge color={getColor(task.priority)} size="lg" fullWidth>
              {task.priority}
            </Badge>
          </Group>
        </Card>
      ))}
      <Pagination
        total={100}
        color={isDarkScheme ? "yellow" : "dark"}
        mt="md"
        grow
      />
    </div>
  );
};

export default CardList;
