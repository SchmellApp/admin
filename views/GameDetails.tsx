import React, { useState } from "react";
import { Game } from "@app/types";
import {
  ActionIcon,
  Card,
  Center,
  Group,
  Image,
  SegmentedControl,
  Text,
  Title
} from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { GameStatus } from "@app/enums";
import { ConfirmStatus, EditGame } from "@app/modals";
import { useEditGameMutation, useModal } from "@app/hooks";

interface GameDetailsProps {
  game: Game;
}

const GameDetails = ({ game }: GameDetailsProps): JSX.Element => {
  const {
    onClose: closeEdit,
    isOpen: isEditOpen,
    onOpen: openEdit
  } = useModal();
  const {
    onClose: closeConfirm,
    isOpen: statusOpen,
    onOpen: openConfirm
  } = useModal();
  const [status, setStatus] = useState(game.status);
  const editGame = useEditGameMutation(String(game.id));

  const handleStatusChange = (value: string): void => {
    if ((value as GameStatus) === GameStatus.DEPLOYED) {
      openConfirm();
    } else {
      editGame.mutate({ status: value as GameStatus });
      setStatus(value as GameStatus);
    }
  };

  return (
    <Center mt="xl">
      <Card
        my="md"
        shadow="md"
        radius="md"
        p="xl"
        sx={{ position: "relative" }}
      >
        <ActionIcon
          size={30}
          variant="default"
          sx={{ position: "absolute", top: 5, right: 5 }}
          onClick={openEdit}
        >
          <IconEdit />
        </ActionIcon>
        <Group position="center" mt="md">
          <div style={{ alignSelf: "flex-start" }}>
            <Title order={4}>Beskrivelse av {game?.name}:</Title>
            <Text>{game?.description}</Text>
          </div>
          <Image
            src={game?.logoUrl}
            alt={game?.name}
            width={200}
            height={200}
            withPlaceholder
            radius="md"
          />
        </Group>
        <SegmentedControl
          data={[GameStatus.DEVELOPMENT, GameStatus.READY, GameStatus.DEPLOYED]}
          fullWidth
          onChange={(value) => handleStatusChange(value)}
          value={status}
          mt="md"
        />
      </Card>
      <EditGame isOpen={isEditOpen} onClose={closeEdit} game={game} />
      <ConfirmStatus
        isOpen={statusOpen}
        id={game.id}
        onClose={closeConfirm}
        setStatus={setStatus}
      />
    </Center>
  );
};

export default GameDetails;
