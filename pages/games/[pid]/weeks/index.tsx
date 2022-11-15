import { Wrapper, ActionDialog } from "@app/components";
import {
  MediaQuery,
  SimpleGrid,
  Title,
  Card as MantineCard,
  ActionIcon,
  CardProps,
  NumberInput,
  Box,
  Skeleton
} from "@mantine/core";
import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import { IconCirclePlus, IconTrash } from "@tabler/icons";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  useDeleteWeekMutation,
  useWeekMutation,
  useWeeksQuery
} from "@app/hooks";

interface WeekCardProps extends CardProps {
  deleteIcon?: boolean;
  id?: number;
}

export default withPageAuthRequired(function Weeks(): JSX.Element {
  const route = useRouter();
  const {
    data: weeks,
    isLoading,
    isSuccess
  } = useWeeksQuery(route.query.pid as string);
  const weekMutation = useWeekMutation(route.query.pid as string);
  const deleteMutation = useDeleteWeekMutation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: 0
  });

  const handleSubmit = (): void => {
    if (inputRef.current !== null) {
      weekMutation.mutate({
        weekNumber: Number(inputRef.current.value),
        relatedGame: Number(route.query.pid)
      });
    }
  };

  const handleDeleteShow = (id: number): void =>
    setDeleteDialog({ isOpen: true, id });
  const handleDeleteClose = (): void =>
    setDeleteDialog({ isOpen: false, id: 0 });
  const handleDelete = (): void => {
    deleteMutation.mutate(deleteDialog.id);
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
        cols={7}
        spacing="sm"
        breakpoints={[
          { maxWidth: 600, cols: 2, spacing: "lg" },
          {
            minWidth: 800,
            cols: 2,
            spacing: "xs"
          },
          {
            minWidth: 1000,
            cols: 3,
            spacing: "sm"
          },
          {
            minWidth: 1200,
            cols: 4,
            spacing: "sm"
          },
          {
            minWidth: 1400,
            cols: 5,
            spacing: "sm"
          },
          {
            minWidth: 1600,
            cols: 6,
            spacing: "sm"
          },
          {
            minWidth: 1800,
            cols: 7
          }
        ]}
      >
        {isLoading && (
          <>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </>
        )}
        {weeks != null &&
          isSuccess &&
          weeks.map((week) => (
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
});
