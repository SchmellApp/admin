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
import { toUserControls } from "@/utils/user";
import { users } from "@/lib/demo/users/user";
import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "@/constants/task";

interface FilterMenuProps {
  filters: string[];
  handleFilter: (values: string[]) => void;
  responsible: string;
  setResponsible: (value: string) => void;
}

const FilterMenu: FC<FilterMenuProps> = ({
  handleFilter,
  filters,
  responsible,
  setResponsible
}): JSX.Element => {
  const theme = useMantineTheme();
  const isDarkScheme = theme.colorScheme === "dark";

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
            value={filters}
            onChange={(value) => handleFilter(value)}
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
            value={filters}
            onChange={(value) => handleFilter(value)}
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
            value={filters}
            onChange={(value) => handleFilter(value)}
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
            <SegmentedControl
              data={toUserControls(users)}
              radius="lg"
              mt="sm"
              onChange={setResponsible}
              value={responsible}
            />
          </Center>
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default FilterMenu;
