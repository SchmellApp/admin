import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useModal, useQuestionTypes } from "@app/hooks";
import React, { useState } from "react";
import { QuestionTypeCard, SchmellButton, Wrapper } from "@app/components";
import {
  Group,
  MediaQuery,
  SimpleGrid,
  Skeleton,
  TextInput,
  Title
} from "@mantine/core";
import { AddQuestionType } from "@app/modals";

export default withPageAuthRequired(function QuestionTypes(): JSX.Element {
  const [name, setName] = useState<string>("");

  const { data: questionTypes, isLoading } = useQuestionTypes(name);

  const { isOpen: showAdd, onOpen: onShowAdd, onClose: onHideAdd } = useModal();

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Spørsmålstyper
        </Title>
      </MediaQuery>
      <Group position="apart">
        <TextInput
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Søk etter type"
          size="lg"
        />
        <SchmellButton label="Ny spørsmålstype" onClick={onShowAdd} />
      </Group>
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
        {isLoading ? (
          <>
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </>
        ) : (
          questionTypes?.map((questionType) => (
            <QuestionTypeCard
              key={questionType.id}
              questionType={questionType}
            />
          ))
        )}
      </SimpleGrid>
      <AddQuestionType onClose={onHideAdd} isOpen={showAdd} />
    </Wrapper>
  );
});
