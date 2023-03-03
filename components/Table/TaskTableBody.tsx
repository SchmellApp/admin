import { Task } from "@app/types";
import { TaskStatus } from "@app/enums";
import { Avatar, Badge, Group, Text } from "@mantine/core";
import {
  getColor,
  getDifferenceInDays,
  toCategoryString,
  toDateString,
  toPriorityString
} from "@app/utils";
import React from "react";

interface TaskTableBodyProps {
  data: Task[];
  handleRowClick: (id: number) => Promise<void>;
}

const TaskTableBody = ({
  data,
  handleRowClick
}: TaskTableBodyProps): JSX.Element => {
  return (
    <tbody>
      {data.map((task) => (
        <tr
          style={{
            opacity: task.status === TaskStatus.DONE ? 0.5 : 1,
            cursor: "pointer"
          }}
          key={task.id}
          onClick={() => {
            void handleRowClick(task.id);
          }}
        >
          <td>
            <Group position="left">
              <Avatar src={task.responsibleUser.profilePictureUrl} />
              <div>
                <Text>{task.title}</Text>
                <Text size="xs" color="dimmed">
                  {getDifferenceInDays(new Date(task.lastUpdated))}
                </Text>
              </div>
            </Group>
          </td>
          <td>{toCategoryString(task.category)}</td>
          <td>{toDateString(new Date(task.deadline))}</td>
          <td>
            <Badge color={getColor(task.priority)} size="lg" fullWidth>
              {toPriorityString(task.priority)}
            </Badge>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TaskTableBody;
