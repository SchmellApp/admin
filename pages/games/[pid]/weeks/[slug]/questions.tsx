import { Wrapper } from "@/components/Wrappers";
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
import { games } from "@/lib/demo/games/game";
import { weeks } from "@/lib/demo/weeks/week";
import { GameDetails } from "@/views";
import { AddQuestion } from "@/modals";
import { SchmellButton } from "@/components/Buttons";
import { questions } from "@/lib/demo/questions/question";
import QuestionCard from "@/components/Cards/QuestionCard";

export default function Questions(): JSX.Element {
  const route = useRouter();
  const isDarkMode = useMantineTheme().colorScheme === "dark";

  const [showDetails, setShowDetails] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleShowAdd = (): void => setShowAdd((prev) => !prev);
  const selectedGame = games.find(
    (game) => game.id === Number(route.query.pid)
  );
  const selectedWeek = weeks.find(
    (week) => week.id === Number(route.query.slug)
  );
  const filteredQuestions = questions.filter((question) => {
    return question.relatedWeek === Number(route.query.slug);
  });

  const items = [
    {
      title: "Spill",
      href: "/games"
    },
    {
      title: selectedGame?.name,
      href: `/games/${selectedGame?.id ?? 0}/weeks`
    },
    {
      title: `Uke: ${selectedWeek?.weekNumber ?? 0}`,
      href: `/games/${selectedGame?.id ?? 0}/weeks/${
        selectedWeek?.id ?? 0
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
      {selectedGame !== undefined && showDetails && (
        <GameDetails game={selectedGame} />
      )}
      <SchmellButton onClick={handleShowAdd} label="Opprett spørsmål" />
      {selectedGame !== undefined && selectedWeek !== undefined && (
        <AddQuestion
          isOpen={showAdd}
          onClose={handleShowAdd}
          selectedGame={selectedGame}
          selectedWeek={selectedWeek}
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
        {filteredQuestions.map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </SimpleGrid>
    </Wrapper>
  );
}
