import React, { useState } from "react";
import {
  Wrapper,
  GameCard,
  ActionDialog,
  SchmellButton
} from "@app/components";
import { MediaQuery, SimpleGrid, Title, Skeleton, Group } from "@mantine/core";
import { AddGameModal } from "@app/modals";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useDeleteGameMutation, useGamesQuery, useModal } from "@app/hooks";
import { IconExternalLink } from "@tabler/icons";

export default withPageAuthRequired(function Games(): JSX.Element {
  const { data: games, isLoading } = useGamesQuery();
  const deleteGameMutation = useDeleteGameMutation();

  const { isOpen: showAdd, onOpen: openAdd, onClose: closeAdd } = useModal();
  const {
    isOpen: showDelete,
    onOpen: openDelete,
    onClose: closeDelete
  } = useModal();

  const [gameToDelete, setGameToDelete] = useState<number | null>(null);

  const handleDelete = async (): Promise<void> => {
    if (gameToDelete !== null) {
      await deleteGameMutation.mutateAsync(String(gameToDelete));
      closeDelete();
      setGameToDelete(null);
    }
  };

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Spill
        </Title>
      </MediaQuery>
      <Group my="md" position="apart">
        <SchmellButton
          label="Spørsmålstyper"
          onClick={() => {}}
          rightIcon={<IconExternalLink />}
          variant="subtle"
          href={"/games/types"}
        />
        <SchmellButton label="Nytt spill" onClick={openAdd} />
      </Group>
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: 600, cols: 1, spacing: "lg" },
          { maxWidth: 900, cols: 2 },
          { maxWidth: 1700, cols: 3 }
        ]}
      >
        {isLoading ? (
          <>
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
          </>
        ) : (
          games?.map((game) => (
            <GameCard
              game={game}
              key={game.id}
              handleClick={() => {
                setGameToDelete(game.id);
                openDelete();
              }}
              isLoading={isLoading}
            />
          ))
        )}
      </SimpleGrid>
      <ActionDialog
        title="Er du sikker på at du ønsker å slette?"
        actions={[
          {
            label: "Ja",
            onClick: () => {
              void handleDelete();
            },
            color: "green",
            isLoading: deleteGameMutation.isLoading
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
      <AddGameModal isOpen={showAdd} onClose={closeAdd} />
    </Wrapper>
  );
});
