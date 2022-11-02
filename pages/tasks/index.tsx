import React, { ReactNode, useState } from "react";
import { Wrapper } from "../../src/components/Wrappers";
import {
  Group,
  MediaQuery,
  Title,
  Button,
  useMantineColorScheme,
  Badge,
  ActionIcon,
  Container
} from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import { FilterMenu } from "../../src/components/Menus";
import { parseFilterValue } from "../../src/types/task/common";
import { getFullName } from "../../src/utils/user";
import { AddTask } from "../../src/modals";
import { DataTable } from "../../src/components/Table";
import { TASKS_HEADER } from "../../src/constants/table";
import { tasks } from "../../src/lib/demo/tasks/task";

export default function Tasks(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();

  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [responsible, setResponsible] = useState<string>("1");
  const [sort, setSort] = useState<string>("");

  const isDarkScheme = colorScheme === "dark";
  const isEmptyFilters = filters.length > 0 || responsible.length > 0;

  const handleFilter = (values: string[]): void => {
    values.forEach((value) => {
      if (!filters.includes(value)) {
        setFilters([...filters, value]);
      }
    });
  };
  const handleRemoveFilter = (filter: string): void => {
    setFilters(filters.filter((f) => f !== filter));
  };
  const handleShowModal = (): void => setShowModal((prev) => !prev);

  const RemoveButton = (onClick: () => void): ReactNode => (
    <ActionIcon
      size={"sm"}
      color={isDarkScheme ? "yellow" : "dark"}
      radius={"xl"}
      variant={"transparent"}
      onClick={onClick}
    >
      <IconX size={20} />
    </ActionIcon>
  );

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Oppgaver
        </Title>
      </MediaQuery>
      <Group position="left" mt="lg">
        <Button
          onClick={handleShowModal}
          color={isDarkScheme ? "yellow" : "dark"}
          rightIcon={<IconPlus />}
          variant="light"
          radius="md"
          size="lg"
        >
          Ny oppgave
        </Button>
      </Group>
      <Group position={isEmptyFilters ? "apart" : "right"} mt="md">
        <Group position="left" style={{ gap: 8 }}>
          {filters.length > 0 &&
            filters.map((filter, index) => (
              <Badge
                variant="outline"
                size="lg"
                key={index}
                rightSection={RemoveButton(() => handleRemoveFilter(filter))}
                color={isDarkScheme ? "yellow" : "white"}
              >
                {parseFilterValue(filter)}
              </Badge>
            ))}
          {responsible.length > 0 && (
            <Badge
              variant="outline"
              size="lg"
              rightSection={RemoveButton(() => setResponsible(""))}
              color={isDarkScheme ? "yellow" : "white"}
            >
              {getFullName(Number(responsible))}
            </Badge>
          )}
        </Group>
        <FilterMenu
          filters={filters}
          handleFilter={handleFilter}
          responsible={responsible}
          setResponsible={setResponsible}
        />
      </Group>
      <Container>
        <DataTable
          headers={TASKS_HEADER}
          sort={sort}
          setSort={setSort}
          tableData={tasks}
        />
      </Container>
      <AddTask isOpen={showModal} onClose={handleShowModal} />
    </Wrapper>
  );
}
