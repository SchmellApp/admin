import { Wrapper, SchmellButton, QuestionCard } from "@app/components";
import {
  Title,
  Anchor,
  Breadcrumbs,
  Group,
  useMantineTheme,
  Switch,
  SimpleGrid
} from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { GameDetails } from "@app/views";
import { AddQuestion } from "@app/modals";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useGameQuery, useQuestionsQuery, useWeekQuery } from "@app/hooks";

export default withPageAuthRequired(function Questions(): JSX.Element {
  const route = useRouter();
  const isDarkMode = useMantineTheme().colorScheme === "dark";

  const { data: currentGame } = useGameQuery(route.query.pid as string);
  const { data: currentWeek } = useWeekQuery(route.query.slug as string);
  const { data: questions, isSuccess } = useQuestionsQuery(
    route.query.slug as string
  );

  const [showDetails, setShowDetails] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleShowAdd = (): void => setShowAdd((prev) => !prev);

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
          color={isDarkMode ? "yellow" : "dark"}
          labelPosition="left"
        />
      </Group>
      {currentGame !== undefined && showDetails && (
        <GameDetails game={currentGame} />
      )}
      <SchmellButton onClick={handleShowAdd} label="Opprett spørsmål" />
      {currentGame !== undefined && currentWeek !== undefined && (
        <AddQuestion
          isOpen={showAdd}
          onClose={handleShowAdd}
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
});
