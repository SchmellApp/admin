import { QuestionCard, SchmellButton, Wrapper } from "@app/components";
import {
  Anchor,
  Breadcrumbs,
  Group,
  MultiSelect,
  SimpleGrid,
  Switch,
  Title
} from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  useGameQuery,
  useModal,
  useQuestionsQuery,
  useTheme
} from "@app/hooks";
import { GameDetails } from "@app/views";
import { AddQuestion } from "@app/modals";
import { toWeekOptions } from "@app/utils";

export default function Questions(): JSX.Element {
  const [weekNumbers, setWeekNumbers] = useState<string[]>([]);
  const route = useRouter();
  const { isDark } = useTheme();

  const { data: currentGame } = useGameQuery(route.query.pid as string);
  const { data: questions } = useQuestionsQuery(
    weekNumbers,
    route.query.pid as string
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
      <Group position="apart">
        <SchmellButton onClick={openAdd} label="Opprett spørsmål" />
        <MultiSelect
          clearable
          size="md"
          searchable
          data={toWeekOptions()}
          value={weekNumbers}
          onChange={setWeekNumbers}
          placeholder="Velg uke"
        />
      </Group>
      {currentGame !== undefined && (
        <AddQuestion
          isOpen={showAdd}
          onClose={closeAdd}
          selectedGame={currentGame}
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
        {questions?.map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </SimpleGrid>
    </Wrapper>
  );
}
