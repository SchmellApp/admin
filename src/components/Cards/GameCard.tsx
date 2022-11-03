import { Game } from "../../types/game";
import React, { FC } from "react";
import {
  Card,
  Group,
  Image,
  Title,
  Text,
  ActionIcon,
  Box
} from "@mantine/core";
import Link from "next/link";
import { toDateString } from "../../utils/date";
import { IconTrash } from "@tabler/icons";

interface GameCardProps {
  game: Game;
  handleClick: (id: number) => void;
}

const GameCard: FC<GameCardProps> = ({ game, handleClick }) => {
  return (
    <Card
      shadow="md"
      p="md"
      radius="md"
      sx={{
        position: "relative",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)"
        }
      }}
    >
      <Box component={Link} href={`/games/${game.id}/weeks/`}>
        <Title order={3} align="center">
          {game.name}
        </Title>
        <Group position="center" mt="md">
          <div>
            <Group spacing="xs">
              <Text weight="bolder" size="sm">
                Antall spørsmål:
              </Text>
              <Text size="sm">1032</Text>
            </Group>
            <Group spacing="xs">
              <Text weight="bolder" size="sm">
                Sist oppdatert:
              </Text>
              <Text size="sm">{toDateString(game.lastUpdated)}</Text>
            </Group>
            <Group spacing="xs">
              <Text weight="bolder" size="sm">
                Antall brukere (totalt):
              </Text>
              <Text size="sm">232</Text>
            </Group>
          </div>
          <Image
            src={game.logoUrl}
            alt={game.name}
            width={150}
            height={150}
            withPlaceholder
            radius="md"
          />
        </Group>
      </Box>
      <ActionIcon
        sx={{ position: "absolute", top: 5, right: 5 }}
        onClick={() => handleClick(game.id)}
      >
        <IconTrash />
      </ActionIcon>
    </Card>
  );
};

export default GameCard;
