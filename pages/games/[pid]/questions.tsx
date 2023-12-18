import {
  QuestionCard,
  QuestionMenu,
  RemoveButton,
  SchmellButton,
  Wrapper
} from "@app/components";
import {
  Anchor,
  Badge,
  Breadcrumbs,
  Group,
  Pagination,
  SimpleGrid,
  Switch,
  TextInput,
  Title
} from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  useGameQuery,
  useModal,
  useQuestionsQuery,
  useQuestionTypes,
  useTheme
} from "@app/hooks";
import { GameDetails } from "@app/views";
import { AddQuestion } from "@app/modals";
import { QuestionFilterMenu } from "@app/types";
import { QuestionDislikeGroup } from "@app/enums";
import { fromDislikeGroupToBoolean } from "@app/constants";

export default function Questions(): JSX.Element {
  const [filters, setFilters] = useState<QuestionFilterMenu>({
    page: 1,
    questionSearch: undefined,
    questionType: undefined,
    weekNumbers: [],
    hasDislikes: QuestionDislikeGroup.All,
    dislikesGreaterThan: undefined
  });
  const route = useRouter();
  const { isDark } = useTheme();

  const { data: currentGame } = useGameQuery(route.query.pid as string);
  const { data: res } = useQuestionsQuery({
    weekNumbers: filters.weekNumbers,
    relatedGame: route.query.pid as string,
    page: filters.page,
    questionSearch: filters.questionSearch,
    questionType: filters.questionType,
    hasDislikes: fromDislikeGroupToBoolean[filters.hasDislikes],
    dislikesGreaterThan: filters.dislikesGreaterThan
  });
  const { data: types } = useQuestionTypes();

  const { onClose: closeAdd, onOpen: openAdd, isOpen: showAdd } = useModal();
  const { isOpen: showDetails, setIsOpen: setShowDetails } = useModal();

  const activeType = types?.find(
    (type) => type.id === Number(filters.questionType)
  );
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
  const showQuestionDislike = filters.hasDislikes !== QuestionDislikeGroup.All;

  const handleFilter =
    (prop: keyof QuestionFilterMenu) => (value: string[] | string | number) => {
      const valueToSet = value === "" ? undefined : value;

      setFilters((prev) => ({
        ...prev,
        [prop]: valueToSet
      }));
    };
  const handleRemove =
    (prop: keyof QuestionFilterMenu) =>
    (value: string | number | undefined): void => {
      if (prop === "questionType" || prop === "dislikesGreaterThan") {
        setFilters((prev) => ({ ...prev, questionType: undefined }));
      } else if (prop === "hasDislikes") {
        setFilters((prev) => ({
          ...prev,
          hasDislikes: QuestionDislikeGroup.All
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [prop]: (prev[prop] as string[]).filter((item) => item !== value)
        }));
      }
    };

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
        <Group>
          <TextInput
            value={filters.questionSearch}
            onChange={(event) =>
              handleFilter("questionSearch")(event.currentTarget.value)
            }
            placeholder="Søk etter spørsmål"
            size="lg"
          />
          <QuestionMenu
            filters={filters}
            handleFilter={handleFilter}
            types={types ?? []}
          />
        </Group>
      </Group>
      <Group position="left" mt="sm" mb="sm">
        {filters.weekNumbers.length > 0 &&
          filters.weekNumbers.map((filter, idx) => (
            <Badge
              variant="outline"
              size="lg"
              key={idx}
              rightSection={RemoveButton(() =>
                handleRemove("weekNumbers")(filter)
              )}
              color={isDark ? "yellow" : "white"}
            >
              Uke {filter}
            </Badge>
          ))}
        {filters.questionType !== undefined && (
          <Badge
            variant="outline"
            size="lg"
            rightSection={RemoveButton(() =>
              handleRemove("questionType")(filters.questionType)
            )}
            color={isDark ? "yellow" : "white"}
          >
            {activeType?.name}
          </Badge>
        )}
        {filters.dislikesGreaterThan !== undefined && (
          <Badge
            variant="outline"
            size="lg"
            rightSection={RemoveButton(() =>
              handleRemove("dislikesGreaterThan")(filters.dislikesGreaterThan)
            )}
            color={isDark ? "yellow" : "white"}
          >
            Fler enn {filters.dislikesGreaterThan} dislikes
          </Badge>
        )}
        {showQuestionDislike && (
          <Badge
            variant="outline"
            size="lg"
            rightSection={RemoveButton(() =>
              handleRemove("hasDislikes")(filters.hasDislikes)
            )}
            color={isDark ? "yellow" : "white"}
          >
            {filters.hasDislikes === QuestionDislikeGroup.Dislikes
              ? "Har dislikes"
              : "Har ikke dislikes"}
          </Badge>
        )}
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
        {res?.questions?.map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </SimpleGrid>
      <Pagination
        total={res?.lastPage ?? 1}
        color={isDark ? "yellow" : "dark"}
        mt="md"
        position="right"
        value={filters.page}
        onChange={handleFilter("page")}
      />
    </Wrapper>
  );
}
