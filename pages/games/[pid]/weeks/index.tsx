import { Wrapper } from "../../../../src/components/Wrappers";
import {
  MediaQuery,
  SimpleGrid,
  Title,
  Card as MantineCard,
  ActionIcon,
  CardProps,
  NumberInput,
  Box
} from "@mantine/core";
import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import { weeks } from "../../../../src/lib/demo/weeks/week";
import { IconCirclePlus, IconTrash } from "@tabler/icons";
import { ActionDialog } from "../../../../src/components/Modals";
import Link from "next/link";

interface WeekCardProps extends CardProps {
  deleteIcon?: boolean;
  id?: number;
}

export default function Weeks(): JSX.Element {
  const route = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: 0
  });

  const gameWeeks = weeks.filter(
    (week) => week.relatedGame.id === Number(route.query.pid)
  );
  const handleSubmit = (): void => {
    console.log(Number(inputRef.current?.value));
  };
  const handleDeleteShow = (id: number): void =>
    setDeleteDialog({ isOpen: true, id });
  const handleDeleteClose = (): void =>
    setDeleteDialog({ isOpen: false, id: 0 });
  const handleDelete = (): void => {
    console.log(deleteDialog.id);
    handleDeleteClose();
  };

  const Card: FC<WeekCardProps> = ({
    children,
    id,
    deleteIcon
  }): JSX.Element => (
    <MantineCard
      shadow="sm"
      p="md"
      radius="md"
      sx={{
        justifyContent: "center",
        position: "relative",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)"
        }
      }}
    >
      {children}
      {deleteIcon === true && (
        <ActionIcon
          sx={{ position: "absolute", top: 5, right: 5, zIndex: 100 }}
          onClick={() => handleDeleteShow(id ?? 0)}
        >
          <IconTrash />
        </ActionIcon>
      )}
    </MantineCard>
  );

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Uker
        </Title>
      </MediaQuery>
      <SimpleGrid
        cols={4}
        spacing="sm"
        breakpoints={[
          {
            maxWidth: 800,
            cols: 2,
            spacing: "xs"
          },
          {
            maxWidth: 1000,
            cols: 3,
            spacing: "sm"
          }
        ]}
      >
        {gameWeeks.map((week) => (
          <Card id={week.id} deleteIcon key={week.id}>
            <Box
              component={Link}
              href={`/games/${route.query.pid as string}/weeks/${
                week.id
              }/questions`}
              sx={{ zIndex: 1 }}
            >
              <Title order={2} align="center">
                Uke {week.weekNumber}
              </Title>
            </Box>
          </Card>
        ))}
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <NumberInput
              placeholder="Uke mellom 1-52"
              min={1}
              max={52}
              ref={inputRef}
            />
            <ActionIcon size="md" ml="xs" onClick={handleSubmit}>
              <IconCirclePlus />
            </ActionIcon>
          </div>
        </Card>
      </SimpleGrid>
      <ActionDialog
        title="Er du sikker på at du ønsker å slette?"
        actions={[
          {
            label: "Ja",
            color: "red",
            onClick: handleDelete
          },
          {
            label: "Nei",
            color: "green",
            onClick: handleDeleteClose
          }
        ]}
        isDialogOpen={deleteDialog.isOpen}
        handleClose={handleDeleteClose}
      />
    </Wrapper>
  );
}
