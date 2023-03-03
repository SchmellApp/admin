import React, { useState } from "react";
import { Wrapper, GameCard, ActionDialog } from "@app/components";
import {
  MediaQuery,
  SimpleGrid,
  Title,
  Card,
  Center,
  UnstyledButton
} from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import { AddGameModal } from "@app/modals";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useDeleteGameMutation, useGamesQuery } from "@app/hooks";

export default withPageAuthRequired(function Games(): JSX.Element {
  const { data: games, isLoading } = useGamesQuery();
  const deleteGameMutation = useDeleteGameMutation();

  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: 0
  });

  const handleShow = (): void => setOpen((o) => !o);
  const handleClose = (): void => setDeleteDialog({ isOpen: false, id: 0 });
  const handleClick = (id: number): void =>
    setDeleteDialog({ isOpen: true, id });
  const handleDelete = (): void => {
    deleteGameMutation.mutate(String(deleteDialog.id));
    handleClose();
  };

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Spill
        </Title>
      </MediaQuery>
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: 600, cols: 1, spacing: "lg" },
          { maxWidth: 900, cols: 2 },
          { maxWidth: 1700, cols: 3 }
        ]}
      >
        {games?.map((game) => (
          <GameCard
            game={game}
            key={game.id}
            handleClick={handleClick}
            isLoading={isLoading}
          />
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
});
