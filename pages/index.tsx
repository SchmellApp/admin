import React from "react";
import { Wrapper } from "@/components/Wrappers";
import { MediaQuery, SimpleGrid, Title } from "@mantine/core";
import { dayStatistics, tasksForToday } from "@/lib/demo/home/statistics";
import { ActionCard, TableCard, TextCard } from "@/components/Cards";
import { DAY_STATISTICS_CARDS, DAY_STATISTICS_HEADER } from "@/constants/table";
import {
  toCategoryActions,
  toDayStatisticsRow,
  toTodayActions
} from "@/utils/statistics";

export default function Home(): JSX.Element {
  const statistics = dayStatistics;

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
          description={statistics.taskCount.unsolved}
        />
        <TextCard
          title={"Oppgaver over frist"}
          description={statistics.taskCount.overdue}
        />
        <TextCard
          title={"Antall spill"}
          description={statistics.gameCount.count}
        />
        <TextCard
          title={"Antall spørsmål"}
          description={statistics.questionsCount.totalCount}
        />
      </SimpleGrid>
      <TableCard
        title={"Dagens statistikk"}
        description={new Date().toDateString()}
        headers={DAY_STATISTICS_HEADER}
        rows={toDayStatisticsRow(statistics.questionsCount.countByGame)}
        rightCards={DAY_STATISTICS_CARDS}
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
          actionElements={toCategoryActions(
            statistics.taskCount.countByCategory
          )}
          title={"Oppgaver per kategori"}
          description={"Gruppe: Schmell"}
        />
        <ActionCard
          actionElements={toTodayActions(tasksForToday)}
          title={"Oppgaver"}
          description={"Dagens"}
        />
      </SimpleGrid>
    </Wrapper>
  );
}
