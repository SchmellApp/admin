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
import { useIdeaDelete, useIdeasQuery } from "@app/hooks";

export default withPageAuthRequired(function Ideas(): JSX.Element {
  const { data: ideas, isLoading } = useIdeasQuery();
  const deleteIdeaMutation = useIdeaDelete();
  const [openMenu, setOpenMenu] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: 0
  });

  const handleOpenMenu = (): void => setOpenMenu((prev) => !prev);
  const handleDeleteClick = (id: number): void => {
    setDeleteDialog({
      isOpen: true,
      id
    });
  };
  const handleHide = (): void => setDeleteDialog({ isOpen: false, id: 0 });
  const handleDelete = (): void => {
    deleteIdeaMutation.mutate(String(deleteDialog.id));
    handleHide();
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
          onClick={handleOpenMenu}
          label={"Jeg har en ny idé!"}
          rightIcon={openMenu ? <IconX /> : <IconPlus />}
        />
      </Group>
      <Collapse in={openMenu}>
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
            handleClick={handleDeleteClick}
            isLoading={isLoading}
          />
        ))}
      </SimpleGrid>
      <ActionDialog
        title="Er du sikker på at du ønsker å slette?"
        actions={[
          {
            label: "Ja",
            onClick: handleDelete,
            color: "green"
          },
          {
            label: "Nei",
            onClick: handleHide,
            color: "red"
          }
        ]}
        isDialogOpen={deleteDialog.isOpen}
        handleClose={handleHide}
      />
    </Wrapper>
  );
});
