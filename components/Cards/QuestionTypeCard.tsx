import { QuestionType } from "@app/types";
import { useDeleteQuestionType, useModal } from "@app/hooks";
import { ActionIcon, Box, Card, ColorSwatch, Group, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React from "react";
import { ActionDialog, TextGroup } from "@app/components";
import EditQuestionType from "@app/modals/EditQuestionType";

interface QuestionTypeCardProps {
  questionType: QuestionType;
}

const QuestionTypeCard = ({
  questionType
}: QuestionTypeCardProps): JSX.Element => {
  const { mutateAsync: deleteQuestionType, isLoading: isDeleting } =
    useDeleteQuestionType();

  const {
    onOpen: openEdit,
    isOpen: isEditOpen,
    onClose: closeEdit
  } = useModal();
  const {
    onOpen: openDelete,
    isOpen: isDeleteOpen,
    onClose: closeDelete
  } = useModal();

  const handleDelete = async (): Promise<void> =>
    await deleteQuestionType(questionType.id);

  return (
    <Card
      shadow="md"
      radius="md"
      p="sm"
      sx={{
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)"
        }
      }}
    >
      <div>
        <Group position="apart" mb="sm">
          <Text color="dimmed" size="md">
            #{questionType.id}
          </Text>
          <Box sx={{ display: "flex" }}>
            <ActionIcon size="md" onClick={openEdit}>
              <IconEdit />
            </ActionIcon>
            <ActionIcon size="md" onClick={openDelete}>
              <IconTrash />
            </ActionIcon>
          </Box>
        </Group>
        <TextGroup title="Type:" text={questionType.name} />
        <Box
          my="xs"
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Text size="sm" weight={500}>
            Farge:
          </Text>
          <ColorSwatch color={questionType.hexColor} />
        </Box>
        <TextGroup title="Hint for type:" text={questionType.hint} />
      </div>
      <ActionDialog
        title="Er du sikker på at du ønsker å slette?"
        actions={[
          {
            label: "Slett",
            color: "red",
            onClick: () => {
              void handleDelete();
            },
            isLoading: isDeleting
          },
          {
            label: "Avbryt",
            color: "green",
            onClick: closeDelete
          }
        ]}
        isDialogOpen={isDeleteOpen}
        handleClose={closeDelete}
      />
      <EditQuestionType
        questionType={questionType}
        isOpen={isEditOpen}
        onClose={closeEdit}
      />
    </Card>
  );
};

export default QuestionTypeCard;
