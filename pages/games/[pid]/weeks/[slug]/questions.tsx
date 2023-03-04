import { QuestionCard, SchmellButton, Wrapper } from "@app/components";
import {
  Anchor,
  Breadcrumbs,
  Group,
  SimpleGrid,
  Switch,
  Title
} from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import {
  useGameQuery,
  useModal,
  useQuestionsQuery,
  useTheme,
  useWeekQuery
} from "@app/hooks";
import { GameDetails } from "@app/views";
import { AddQuestion } from "@app/modals";

export default function Questions(): JSX.Element {
  const route = useRouter();
  const { isDark } = useTheme();

  const { data: currentGame } = useGameQuery(route.query.pid as string);
  const { data: currentWeek } = useWeekQuery(route.query.slug as string);
  const { data: questions, isSuccess } = useQuestionsQuery(
    route.query.slug as string
  );

  const { onClose: closeAdd, onOpen: openAdd, isOpen: showAdd } = useModal();
  const { isOpen: showDetails, setIsOpen: setShowDetails } = useModal();

  const items = [
    {
      title: "Spill",
      href: "/games"
    },
    {
      title: currentGame?.name,
      href: `/games/${currentGame?.id ?? 0}/weeks`
    },
    {
      title: `Uke: ${currentWeek?.weekNumber ?? 0}`,
      href: `/games/${currentGame?.id ?? 0}/weeks/${
        currentWeek?.id ?? 0
      }/questions`
    }
  ].map((item, index) => (
    <Anchor href={item.href} key={index} color="dimmed" size="sm">
      {item.title}
    </Anchor>
  ));

  return (
    <Wrapper>
      <Group position="apart" mb="md">
        <div>
          <Title order={2}>Spørsmål</Title>
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>
        <Switch
          checked={showDetails}
          onChange={(event) => setShowDetails(event.currentTarget.checked)}
          size="lg"
          label="Vis spilldetaljer"
          color={isDark ? "yellow" : "dark"}
          labelPosition="left"
        />
      </Group>
      {showDetails && currentGame !== undefined && (
        <GameDetails game={currentGame} />
      )}
      <SchmellButton onClick={openAdd} label="Opprett spørsmål" />
      {currentGame !== undefined && currentWeek !== undefined && (
        <AddQuestion
          isOpen={showAdd}
          onClose={closeAdd}
          selectedGame={currentGame}
          selectedWeek={currentWeek}
        />
      )}
      <SimpleGrid
        cols={4}
        spacing="sm"
        mt="md"
        breakpoints={[
          {
            maxWidth: 600,
            cols: 1,
            spacing: "md"
          },
          {
            maxWidth: 900,
            cols: 2,
            spacing: "sm"
          },
          {
            maxWidth: 1200,
            cols: 3,
            spacing: "sm"
          }
        ]}
      >
        {questions !== undefined &&
          isSuccess &&
          questions.map((question) => (
            <QuestionCard question={question} key={question.id} />
          ))}
      </SimpleGrid>
    </Wrapper>
  );
}
