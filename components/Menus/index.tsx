import {
  ActionIcon,
  Menu,
  Title,
  Text,
  useMantineTheme,
  MultiSelect,
  SegmentedControl,
  Center
} from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import React, { FC } from "react";
import { toUserControls } from "@app/utils";
import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "@app/constants";
import { FilterMenu as Filter } from "@app/types";
import { useUsersQuery } from "@app/hooks";

interface FilterMenuProps {
  filters: Filter;
  handleFilter: (prop: keyof Filter) => (values: string[] | string) => void;
}

const FilterMenu: FC<FilterMenuProps> = ({
  handleFilter,
  filters
}): JSX.Element => {
  const theme = useMantineTheme();
  const isDarkScheme = theme.colorScheme === "dark";
  const { data: users } = useUsersQuery();

  return (
    <Menu shadow="md" position={"left-start"}>
      <Menu.Target>
        <ActionIcon color={isDarkScheme ? "yellow" : "dark"} size="lg">
          <IconFilter size={30} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Title order={4} color={isDarkScheme ? "white" : "dark"}>
            Filter
          </Title>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDarkScheme ? "white" : "dark"}>
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
          <Text size="md" color={isDarkScheme ? "white" : "dark"}>
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
          <Text size="md" color={isDarkScheme ? "white" : "dark"}>
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
          <Text size="md" color={isDarkScheme ? "white" : "dark"}>
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

export default FilterMenu;
