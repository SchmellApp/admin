import { Game } from "@app/types";
import React, { FC } from "react";
import {
  Card,
  Group,
  Image,
  Title,
  Text,
  ActionIcon,
  Box,
  Skeleton
} from "@mantine/core";
import Link from "next/link";
import { toDateString } from "@app/utils";
import { IconTrash } from "@tabler/icons";
import { useGetStatisticsQuery } from "@app/hooks";

interface GameCardProps {
  game: Game;
  handleClick: (id: number) => void;
  isLoading?: boolean;
}

const GameCard: FC<GameCardProps> = ({ game, handleClick, isLoading }) => {
  const { data: statistics, isLoading: isFetching } = useGetStatisticsQuery();

  const questionsCount = statistics?.questionsCount.countByGame.find(
    (g) => g.gameId === game.id
  )?.count;

  return (
    <>
      {isLoading === true ? (
        <Skeleton height={300} />
      ) : (
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
                  <Text size="sm">
                    {isFetching ? "Laster inn..." : questionsCount}
                  </Text>
                </Group>
                <Group spacing="xs">
                  <Text weight="bolder" size="sm">
                    Sist oppdatert:
                  </Text>
                  <Text size="sm">
                    {toDateString(new Date(game.lastUpdated))}
                  </Text>
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
      )}
    </>
  );
};

export default GameCard;
