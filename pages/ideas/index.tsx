import React, { useState } from "react";
import {
  Wrapper,
  IdeaForm,
  ListElements,
  ActionDialog,
  SchmellButton
} from "@app/components";
import { Group, MediaQuery, Title, Collapse, SimpleGrid } from "@mantine/core";
import { filterByCategory, toListElements } from "@app/utils";
import { IDEA_CATEGORIES_ELEMENTS } from "@app/constants";
import { IconPlus, IconX } from "@tabler/icons";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useIdeaDelete, useIdeasQuery, useModal } from "@app/hooks";

export default withPageAuthRequired(function Ideas(): JSX.Element {
  const { data: ideas, isLoading } = useIdeasQuery();
  const deleteIdeaMutation = useIdeaDelete();

  const { isOpen: showAdd, onOpen: openAdd, onClose: closeAdd } = useModal();
  const {
    isOpen: showDelete,
    onOpen: openDelete,
    onClose: closeDelete
  } = useModal();

  const [ideaToDelete, setIdeaToDelete] = useState<number | null>(null);

  const handleDelete = async (): Promise<void> => {
    if (ideaToDelete !== null) {
      await deleteIdeaMutation.mutateAsync(ideaToDelete);
      closeDelete();
      setIdeaToDelete(null);
    }
  };

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Ideer
        </Title>
      </MediaQuery>
      <Group position="right">
        <SchmellButton
          onClick={showAdd ? closeAdd : openAdd}
          label={"Jeg har en ny idé!"}
          rightIcon={showAdd ? <IconX /> : <IconPlus />}
        />
      </Group>
      <Collapse in={showAdd}>
        <IdeaForm />
      </Collapse>
      <SimpleGrid
        cols={4}
        spacing="md"
        mt="md"
        breakpoints={[
          {
            maxWidth: "lg",
            cols: 2,
            spacing: "sm"
          },
          {
            maxWidth: 600,
            cols: 1,
            spacing: "md"
          }
        ]}
      >
        {IDEA_CATEGORIES_ELEMENTS.map((category) => (
          <ListElements
            key={category.title}
            title={category.title}
            color={category.color}
            elements={
              ideas !== undefined
                ? toListElements(filterByCategory(ideas, category.category))
                : []
            }
            handleClick={openDelete}
            isLoading={isLoading}
          />
        ))}
      </SimpleGrid>
      <ActionDialog
        title="Er du sikker på at du ønsker å slette?"
        actions={[
          {
            label: "Ja",
            onClick: () => {
              void handleDelete();
            },
            color: "green"
          },
          {
            label: "Nei",
            onClick: closeDelete,
            color: "red"
          }
        ]}
        isDialogOpen={showDelete}
        handleClose={closeDelete}
      />
    </Wrapper>
  );
});
