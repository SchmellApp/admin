import React, { useState } from "react";
import { Wrapper } from "../../src/components/Wrappers";
import {
  MediaQuery,
  SimpleGrid,
  Title,
  Card,
  Center,
  UnstyledButton
} from "@mantine/core";
import { games } from "../../src/lib/demo/games/game";
import { GameCard } from "../../src/components/Cards";
import { IconCirclePlus } from "@tabler/icons";
import { ActionDialog } from "../../src/components/Modals";
import { AddGameModal } from "../../src/modals";

export default function Games(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: 0
  });

  const handleShow = (): void => setOpen((o) => !o);
  const handleClose = (): void => setDeleteDialog({ isOpen: false, id: 0 });
  const handleClick = (id: number): void =>
    setDeleteDialog({ isOpen: true, id });
  const handleDelete = (): void =>
    console.log("Not implemented yet", deleteDialog.id);

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Spill
        </Title>
      </MediaQuery>
      <SimpleGrid
        cols={3}
        spacing="md"
        breakpoints={[
          { maxWidth: 600, cols: 1, spacing: "lg" },
          { maxWidth: 900, cols: 2 },
          { maxWidth: 1200, cols: 3 }
        ]}
      >
        {games.map((game) => (
          <GameCard game={game} key={game.id} handleClick={handleClick} />
        ))}
        <UnstyledButton onClick={handleShow}>
          <Card
            shadow="md"
            p="md"
            radius="md"
            sx={{
              transition: "all 0.2s ease",
              width: "100%",
              height: "100%",
              "&:hover": {
                transform: "translateY(-5px)"
              }
            }}
          >
            <Center sx={{ flexDirection: "column", height: "100%" }}>
              <Title order={1}>Legg til spill</Title>
              <IconCirclePlus size={75} />
            </Center>
          </Card>
        </UnstyledButton>
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
            onClick: handleClose,
            color: "red"
          }
        ]}
        isDialogOpen={deleteDialog.isOpen}
        handleClose={handleClose}
      />
      <AddGameModal isOpen={open} onClose={handleShow} />
    </Wrapper>
  );
}
