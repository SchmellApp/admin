import { QuestionFilterMenu, QuestionType } from "@app/types";
import { useTheme } from "@app/hooks";
import {
  ActionIcon,
  Menu,
  Title,
  Text,
  Select,
  SegmentedControl,
  NumberInput
} from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import React from "react";
import { toQuestionTypeOptions } from "@app/utils";
import { QuestionHasDislikes } from "@app/constants";

interface QuestionMenuProps {
  filters: QuestionFilterMenu;
  handleFilter: (
    prop: keyof QuestionFilterMenu
  ) => (values: string[] | string | number) => void;
  types: QuestionType[];
}

const QuestionMenu = ({
  handleFilter,
  filters,
  types
}: QuestionMenuProps): JSX.Element => {
  const { isDark } = useTheme();

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
            Type
          </Text>
          <Select
            value={filters.questionType}
            onChange={(value) => handleFilter("questionType")(value ?? "")}
            data={toQuestionTypeOptions(types ?? [])}
            searchable
            placeholder="Velg type"
            mt="sm"
          />
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDark ? "white" : "dark"}>
            Dislikes
          </Text>
          <SegmentedControl
            data={QuestionHasDislikes}
            value={filters.hasDislikes}
            onChange={(value) => handleFilter("hasDislikes")(value)}
            mt="sm"
            fullWidth
          />
          <NumberInput
            label="Antall dislikes"
            placeholder="0"
            mt="sm"
            value={filters.dislikesGreaterThan}
            onChange={(value) => handleFilter("dislikesGreaterThan")(value)}
          />
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default QuestionMenu;
