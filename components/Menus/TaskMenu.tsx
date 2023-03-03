import {
  ActionIcon,
  Menu,
  Title,
  Text,
  MultiSelect,
  SegmentedControl,
  Center
} from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import React from "react";
import { toUserControls } from "@app/utils";
import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "@app/constants";
import { TaskFilterMenu } from "@app/types";
import { useTheme, useUsersQuery } from "@app/hooks";

interface TaskMenuProps {
  filters: TaskFilterMenu;
  handleFilter: (
    prop: keyof TaskFilterMenu
  ) => (values: string[] | string) => void;
}

const TaskMenu = ({ handleFilter, filters }: TaskMenuProps): JSX.Element => {
  const { isDark } = useTheme();
  const { data: users } = useUsersQuery();

  return (
    <Menu shadow="md" position={"left-start"}>
      <Menu.Target>
        <ActionIcon color={isDark ? "yellow" : "dark"} size="lg">
          <IconFilter size={30} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Title order={4} color={isDark ? "white" : "dark"}>
            Filter
          </Title>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDark ? "white" : "dark"}>
            Prioritet
          </Text>
          <MultiSelect
            value={filters.priority}
            onChange={(value) => handleFilter("priority")(value)}
            data={TASK_PRIORITY}
            searchable
            placeholder="Velg prioritet"
            mt="sm"
          />
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDark ? "white" : "dark"}>
            Status
          </Text>
          <MultiSelect
            value={filters.status}
            onChange={(value) => handleFilter("status")(value)}
            data={TASK_STATUS}
            searchable
            placeholder="Velg status"
            mt="sm"
          />
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDark ? "white" : "dark"}>
            Kategori
          </Text>
          <MultiSelect
            value={filters.category}
            onChange={(value) => handleFilter("category")(value)}
            data={TASK_CATEGORY}
            searchable
            placeholder="Velg kategori"
            mt="sm"
          />
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDark ? "white" : "dark"}>
            Ansvarlig
          </Text>
          <Center>
            {users != null && (
              <SegmentedControl
                data={toUserControls(users)}
                radius="lg"
                mt="sm"
                onChange={(value) => handleFilter("responsible")(value)}
                value={filters.responsible}
              />
            )}
          </Center>
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TaskMenu;
