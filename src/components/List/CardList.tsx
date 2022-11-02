import { Task } from "../../types/task";
import React, { FC } from "react";
import { Avatar, Card, Divider, Group, Pagination, Text } from "@mantine/core";
import Link from "next/link";
import {
  getDifferenceInDays,
  parseDateToUnderstandable
} from "../../utils/date";
import { useColorScheme } from "@mantine/hooks";
import { parseCategoryToUnderstandable } from "../../utils/category";
import { parsePriorityToBadge } from "../../utils/priority";

interface CardListProps {
  tableData: Task[];
}

const CardList: FC<CardListProps> = ({ tableData }): JSX.Element => {
  const isDarkScheme = useColorScheme() === "dark";

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
            <Text>{parseCategoryToUnderstandable(task.category)}</Text>
          </Group>
          <Group position="left" my="xs">
            <Text weight="bolder">Frist:</Text>
            <Text>{parseDateToUnderstandable(task.deadline)}</Text>
          </Group>
          <Group position="left" my="xs">
            <Text weight="bolder">Prioritet:</Text>
            <Text>{parsePriorityToBadge(task.priority, true)}</Text>
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
