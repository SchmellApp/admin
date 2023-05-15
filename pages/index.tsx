import React from "react";
import { Wrapper, ActionCard, TableCard, TextCard } from "@app/components";
import { MediaQuery, SimpleGrid, Title } from "@mantine/core";
import { DAY_STATISTICS_HEADER } from "@app/constants";
import {
  toCategoryActions,
  toDayStatisticsRow,
  toTodayActions
} from "@app/utils";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  useGetStatisticsQuery,
  useSelfQuery,
  useTodaysTasksQuery
} from "@app/hooks";
import packageJson from "../package.json";
import { useAppState } from "@app/hooks/state";

export default withPageAuthRequired(function Home(): JSX.Element {
  const { isLoading, data } = useGetStatisticsQuery();
  const { data: activeUser } = useSelfQuery();
  const { data: todaysTasks } = useTodaysTasksQuery(
    activeUser !== undefined ? String(activeUser.id) : String(0)
  );
  const { solvedTasks } = useAppState();

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Oversikt
        </Title>
      </MediaQuery>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 600, cols: 1, spacing: "sm" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 980, cols: 2, spacing: "sm" }
        ]}
      >
        <TextCard
          title={"Uløste oppgaver"}
          description={String(data?.taskCount.unsolved)}
          isLoading={isLoading}
        />
        <TextCard
          title={"Oppgaver over frist"}
          description={String(data?.taskCount.overdue)}
          isLoading={isLoading}
        />
        <TextCard
          title={"Antall spill"}
          description={String(data?.gameCount.count)}
          isLoading={isLoading}
        />
        <TextCard
          title={"Antall spørsmål"}
          description={String(data?.questionsCount.totalCount)}
          isLoading={isLoading}
        />
      </SimpleGrid>
      <TableCard
        title={"Dagens statistikk"}
        description={new Date().toDateString()}
        headers={DAY_STATISTICS_HEADER}
        rows={
          data !== undefined
            ? toDayStatisticsRow(data?.questionsCount.countByGame)
            : []
        }
        rightCards={[
          {
            title: "Løste oppgaver",
            description: String(solvedTasks)
          },
          {
            title: "Antall brukere",
            description: String(data?.dayStatistics.userCount)
          },
          {
            title: "Antall spill spilt",
            description: String(data?.dayStatistics.gamesPlayed)
          },
          {
            title: "Versjon",
            description: packageJson.version
          }
        ]}
        isLoading={isLoading}
      />
      <SimpleGrid
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: 600, cols: 1, spacing: "sm" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 980, cols: 2, spacing: "sm" }
        ]}
        mt="xl"
      >
        <ActionCard
          actionElements={
            data !== undefined
              ? toCategoryActions(data.taskCount.countByCategory)
              : []
          }
          title={"Oppgaver per kategori"}
          description={"Gruppe: Schmell"}
          isLoading={isLoading}
        />
        <ActionCard
          actionElements={toTodayActions(todaysTasks?.tasks ?? [])}
          title={"Oppgaver"}
          description={"Dagens"}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Wrapper>
  );
});
