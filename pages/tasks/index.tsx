import React, { ReactNode, useState } from "react";
import { Wrapper } from "../../src/components/Wrappers";
import {
  Group,
  MediaQuery,
  Title,
  useMantineColorScheme,
  Badge,
  ActionIcon
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { FilterMenu } from "../../src/components/Menus";
import { getFullName, getUser } from "../../src/utils/user";
import { AddTask } from "../../src/modals";
import { DataTable } from "../../src/components/Table";
import { TASKS_HEADER } from "../../src/constants/table";
import { tasks } from "../../src/lib/demo/tasks/task";
import { useMediaQuery } from "@mantine/hooks";
import { CardList } from "../../src/components/List";
import { SchmellButton } from "../../src/components/Buttons";

export default function Tasks(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [responsible, setResponsible] = useState<string>("1"); // TODO: Update with user id
  const [sort, setSort] = useState<string>("");

  const isDarkScheme = colorScheme === "dark";
  const isEmptyFilters = filters.length > 0 || responsible.length > 0;
  const activeUser = getUser(Number(responsible));

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
        <SchmellButton onClick={handleShowModal} label={"Ny oppgave"} />
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
                {filter}
              </Badge>
            ))}
          {responsible.length > 0 && (
            <Badge
              variant="outline"
              size="lg"
              rightSection={RemoveButton(() => setResponsible(""))}
              color={isDarkScheme ? "yellow" : "white"}
            >
              {activeUser != null ? getFullName(activeUser) : ""}
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
      <div>
        {isMobileScreen ? (
          <CardList tableData={tasks} />
        ) : (
          <DataTable
            headers={TASKS_HEADER}
            sort={sort}
            setSort={setSort}
            tableData={tasks}
          />
        )}
      </div>
      <AddTask isOpen={showModal} onClose={handleShowModal} />
    </Wrapper>
  );
}
