import { DataTableHeader, Task } from "@app/types";
import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import {
  Avatar,
  Badge,
  Button,
  Group,
  Pagination,
  Table,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { TaskStatus } from "@app/enums";
import {
  getDifferenceInDays,
  toDateString,
  getColor,
  toCategoryString,
  toPriorityString
} from "@app/utils";
import { useRouter } from "next/router";

interface DataTableProps {
  headers: DataTableHeader[];
  tableData: Task[];
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  currentPage: number;
  maxPage: number;
  onChangePage: (page: number) => void;
  title?: string;
}

const DataTable: FC<DataTableProps> = ({
  title,
  headers,
  setSort,
  sort,
  tableData,
  currentPage,
  maxPage,
  onChangePage
}): JSX.Element => {
  const router = useRouter();
  const isDarkScheme = useMantineColorScheme().colorScheme === "dark";

  const getSortIcon = (header: DataTableHeader): ReactNode | undefined => {
    if (header.isSortable && header.sortKeys != null) {
      if (sort === header.sortKeys.ASC) {
        return <IconChevronUp size={16} />;
      } else if (sort === header.sortKeys.DESC) {
        return <IconChevronDown size={16} />;
      }
    }
  };
  const handleClick = (header: DataTableHeader): void => {
    if (header.isSortable && header.sortKeys != null) {
      if (sort === header.sortKeys.ASC) {
        setSort(header.sortKeys.DESC);
      } else if (sort === header.sortKeys.DESC) {
        setSort("");
      } else {
        setSort(header.sortKeys.ASC);
      }
    }
  };

  return (
    <div>
      <Title order={3} mb="sm">
        {title}
      </Title>
      <Table verticalSpacing="lg" highlightOnHover horizontalSpacing="md">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.name}>
                {header.isSortable ? (
                  <Tooltip label="Sorter">
                    <Button
                      variant="subtle"
                      color="dark"
                      onClick={() => handleClick(header)}
                      rightIcon={getSortIcon(header)}
                    >
                      {header.name}
                    </Button>
                  </Tooltip>
                ) : (
                  header.name
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr
              style={{
                opacity: task.status === TaskStatus.DONE ? 0.5 : 1,
                cursor: "pointer"
              }}
              key={task.id}
              onClick={() => {
                void router.push(`/tasks/${task.id}`);
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
      </Table>
      <Pagination
        total={maxPage}
        color={isDarkScheme ? "yellow" : "dark"}
        mt="md"
        position="right"
        page={currentPage}
        onChange={(page) => onChangePage(page)}
      />
    </div>
  );
};

export default DataTable;
