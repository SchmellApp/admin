import React, { useState } from "react";
import { Wrapper } from "../../src/components/Wrappers";
import {
  Group,
  MediaQuery,
  Title,
  Collapse,
  SimpleGrid,
  useMantineTheme
} from "@mantine/core";
import { IdeaForm } from "../../src/components/Forms";
import { ListElements } from "../../src/components/List";
import { ideas } from "../../src/lib/demo/ideas/ideas";
import { filterByCategory, toListElements } from "../../src/utils/idea";
import { ActionDialog } from "../../src/components/Modals";
import { SchmellButton } from "../../src/components/Buttons";
import { IDEA_CATEGORIES_ELEMENTS } from "../../src/constants/idea";

export default function Ideas(): JSX.Element {
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
    console.log("Not implemented yet", deleteDialog.id);
  };

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Ideer
        </Title>
      </MediaQuery>
      <Group position="right">
        <SchmellButton onClick={handleOpenMenu} label={"Jeg har en ny idé!"} />
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
            elements={toListElements(
              filterByCategory(ideas, category.category)
            )}
            handleClick={handleDeleteClick}
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
}
