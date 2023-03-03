import React, { ReactNode, useEffect, useState } from "react";
import {
  Wrapper,
  SchmellButton,
  TaskMenu,
  DataTableWrapper,
  TaskTableBody,
  TaskCardList
} from "@app/components";
import {
  Group,
  MediaQuery,
  Title,
  useMantineColorScheme,
  Badge,
  ActionIcon
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { AddTask } from "@app/modals";
import { TASKS_HEADER } from "@app/constants";
import { useMediaQuery } from "@mantine/hooks";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { TaskFilterMenu } from "@app/types";
import { toCategoryString, toPriorityString, toStatusString } from "@app/utils";
import { TaskCategory, TaskPriority, TaskStatus } from "@app/enums";
import { useUsersQuery, useTasksQuery } from "@app/hooks";
import { useRouter } from "next/router";

export default withPageAuthRequired(function Tasks(): JSX.Element {
  const { colorScheme } = useMantineColorScheme();
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const router = useRouter();

  const { data: users } = useUsersQuery();

  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<TaskFilterMenu>({
    responsible: "",
    status: [],
    priority: [],
    category: [],
    page: 1
  });
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    if (router.query.category !== undefined) {
      setFilters({
        ...filters,
        category: [...filters.category, router.query.category as string]
      });
    }
  }, [router.query]);

  const { data: tasks } = useTasksQuery({
    responsibleUser:
      filters.responsible !== "" ? filters.responsible : undefined,
    status: filters.status.length > 0 ? filters.status.join("+") : undefined,
    priority:
      filters.priority.length > 0 ? filters.priority.join("+") : undefined,
    category:
      filters.category.length > 0 ? filters.category.join("+") : undefined,
    sort: sort !== "" ? sort : undefined,
    page: filters.page,
    pageSize: 10
  });

  const isDarkScheme = colorScheme === "dark";
  const isEmptyFilters =
    filters.responsible.length === 0 &&
    filters.category.length === 0 &&
    filters.priority.length === 0 &&
    filters.status.length === 0;
  const activeUser = users?.find(
    (user) => user.id === Number(filters.responsible)
  );

  const handleFilter =
    (prop: keyof TaskFilterMenu) =>
    (values: string[] | string | number): void => {
      console.log(prop, values);
      setFilters((prev) => ({ ...prev, [prop]: values }));
    };
  const handleRemove =
    (prop: keyof TaskFilterMenu) =>
    (value: string | number): void => {
      if (prop === "responsible") {
        setFilters((prev) => ({ ...prev, responsible: "" }));
      } else if (prop === "page") {
        setFilters((prev) => ({ ...prev, page: 1 }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [prop]: prev[prop].filter((item) => item !== value)
        }));
      }
    };
  const handleShowModal = (): void => setShowModal((prev) => !prev);
  const handleRowClick = async (id: number): Promise<void> => {
    await router.push(`/tasks/${id}`);
  };

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
      <Group position={isEmptyFilters ? "right" : "apart"} mt="md">
        <Group position="left" style={{ gap: 8 }}>
          {!isEmptyFilters &&
            filters.status.map((filter, idx) => (
              <Badge
                variant="outline"
                size="lg"
                key={idx}
                rightSection={RemoveButton(() =>
                  handleRemove("status")(filter)
                )}
                color={isDarkScheme ? "yellow" : "white"}
              >
                {toStatusString(filter as TaskStatus)}
              </Badge>
            ))}
          {!isEmptyFilters &&
            filters.category.map((filter, idx) => (
              <Badge
                variant="outline"
                size="lg"
                key={idx}
                rightSection={RemoveButton(() =>
                  handleRemove("category")(filter)
                )}
                color={isDarkScheme ? "yellow" : "white"}
              >
                {toCategoryString(filter as TaskCategory)}
              </Badge>
            ))}
          {!isEmptyFilters &&
            filters.priority.map((filter, idx) => (
              <Badge
                variant="outline"
                size="lg"
                key={idx}
                rightSection={RemoveButton(() =>
                  handleRemove("priority")(filter)
                )}
                color={isDarkScheme ? "yellow" : "white"}
              >
                {toPriorityString(filter as TaskPriority)}
              </Badge>
            ))}

          {filters.responsible.length > 0 && (
            <Badge
              variant="outline"
              size="lg"
              rightSection={RemoveButton(() => handleRemove("responsible")(""))}
              color={isDarkScheme ? "yellow" : "white"}
            >
              {activeUser?.firstName} {activeUser?.lastName}
            </Badge>
          )}
        </Group>
        <TaskMenu filters={filters} handleFilter={handleFilter} />
      </Group>
      <div>
        {tasks != null && (
          <>
            {isMobileScreen ? (
              <TaskCardList tableData={tasks.tasks} />
            ) : (
              <DataTableWrapper
                headers={TASKS_HEADER}
                sort={sort}
                setSort={setSort}
                currentPage={filters.page}
                onChangePage={handleFilter("page")}
                maxPage={tasks.lastPage}
              >
                <TaskTableBody
                  data={tasks.tasks}
                  handleRowClick={handleRowClick}
                />
              </DataTableWrapper>
            )}
          </>
        )}
      </div>
      <AddTask isOpen={showModal} onClose={handleShowModal} />
    </Wrapper>
  );
});
