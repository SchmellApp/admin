import React, { useState } from "react";
import { Wrapper } from "../../src/components/Wrappers";
import {
  Group,
  MediaQuery,
  Title,
  Button,
  useMantineColorScheme,
  Collapse,
  SimpleGrid,
  useMantineTheme
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { IdeaForm } from "../../src/components/Forms";
import { ListElements } from "../../src/components/List";
import { ideas } from "../../src/lib/demo/ideas/ideas";
import { buildListElements, filterByCategory } from "../../src/utils/idea";
import { IdeaCategory } from "../../src/types/ideas/category";
import { ActionDialog } from "../../src/components/Modals";

export default function Ideas(): JSX.Element {
  const isDarkMode = useMantineColorScheme().colorScheme === "dark";
  const theme = useMantineTheme();

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
        <Button
          variant="light"
          color={isDarkMode ? "yellow" : "dark"}
          onClick={handleOpenMenu}
          rightIcon={<IconPlus />}
          radius="md"
          size="lg"
        >
          Jeg har en ny idé!
        </Button>
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
        <ListElements
          title="Spill"
          color={theme.colors.yellow[2]}
          elements={buildListElements(
            filterByCategory(ideas, IdeaCategory.GAMES)
          )}
          handleClick={handleDeleteClick}
        />
        <ListElements
          title="Utvikling"
          color={theme.colors.green[2]}
          elements={buildListElements(
            filterByCategory(ideas, IdeaCategory.DEVELOPMENT)
          )}
          handleClick={handleDeleteClick}
        />
        <ListElements
          title="Design"
          color={theme.colors.blue[2]}
          elements={buildListElements(
            filterByCategory(ideas, IdeaCategory.DESIGN)
          )}
          handleClick={handleDeleteClick}
        />
        <ListElements
          title="Diverse"
          color={theme.colors.orange[2]}
          elements={buildListElements(
            filterByCategory(ideas, IdeaCategory.VARIOUS)
          )}
          handleClick={handleDeleteClick}
        />
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
