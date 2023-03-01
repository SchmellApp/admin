import { Question } from "@app/types";
import React, { FC, useRef, useState } from "react";
import {
  Card,
  Group,
  Text,
  Box,
  ActionIcon,
  Button,
  Image
} from "@mantine/core";
import { IconEdit, IconPhoto, IconTrash } from "@tabler/icons";
import { ActionDialog } from "@app/components";
import { EditQuestion } from "@app/modals";
import { useDeleteQuestionMutation } from "@app/hooks";
import { toCommaSeparatedString } from "@app/utils";
import is from "@sindresorhus/is";
import undefined = is.undefined;

interface QuestionCardProps {
  question: Question;
}

interface TextGroupProps {
  title: string;
  text: string;
}

const QuestionCard: FC<QuestionCardProps> = ({ question }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const deleteQuestion = useDeleteQuestionMutation();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleShowEdit = (): void => setShowEdit((prev) => !prev);
  const handleShowDelete = (): void => setShowDelete((prev) => !prev);
  const handleShowImage = (): void => setShowImage((prev) => !prev);
  const handleDelete = (): void => deleteQuestion.mutate(question.id);

  const TextGroup = ({ title, text }: TextGroupProps): JSX.Element => (
    <Box
      my="xs"
      sx={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Text size="sm" weight={500}>
        {title}
      </Text>
      <Text size="sm" align="right" ml="sm">
        {text}
      </Text>
    </Box>
  );

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
      ref={cardRef}
    >
      {!showImage ? (
        <div>
          <Group position="apart" mb="sm">
            <Text color="dimmed" size="md">
              #{question.id}
            </Text>
            <Box sx={{ display: "flex" }}>
              <ActionIcon size="md" onClick={handleShowEdit}>
                <IconEdit />
              </ActionIcon>
              <ActionIcon size="md" onClick={handleShowDelete}>
                <IconTrash />
              </ActionIcon>
            </Box>
          </Group>
          <TextGroup title="Type:" text={question.type} />
          <TextGroup title="Spørsmål:" text={question.questionDescription} />
          <TextGroup title="Fase:" text={String(question.phase)} />
          <TextGroup title="Straff:" text={String(question.punishment)} />
          {question.function?.questions != null &&
            question.function.questions.length > 0 && (
              <TextGroup
                title="Spørsmål:"
                text={toCommaSeparatedString(question.function.questions)}
              />
            )}
          {question.function?.challenges != null &&
            question.function.challenges.length > 0 && (
              <TextGroup
                title="Utfordringer:"
                text={toCommaSeparatedString(question.function.challenges)}
              />
            )}
          {question.function?.answer != null &&
            question.function.answer !== "" && (
              <TextGroup title="Svar:" text={question.function.answer} />
            )}
          {question.function?.timer != null && (
            <TextGroup title="Tid:" text={String(question.function.timer)} />
          )}
          {question.function?.options != null &&
            question.function.options.length > 0 && (
              <TextGroup
                title="Alternativer:"
                text={toCommaSeparatedString(question.function.options)}
              />
            )}

          {question.questionPicture != null && (
            <Group position="right" mb="xs">
              <Button
                variant="light"
                color="red"
                onClick={handleShowImage}
                size="xs"
                rightIcon={<IconPhoto />}
              >
                Vis bilde
              </Button>
            </Group>
          )}
        </div>
      ) : (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
          <Image
            src={question.questionPictureUrl}
            withPlaceholder
            fit="contain"
            radius="md"
            height={200}
          />
          <Button
            variant="light"
            color="red"
            onClick={handleShowImage}
            size="xs"
            rightIcon={<IconPhoto />}
            sx={{ position: "absolute", bottom: 5, right: 5 }}
          >
            Skjul bilde
          </Button>
        </Box>
      )}
      <ActionDialog
        title="Er du sikker på at du ønsker å slette?"
        actions={[
          {
            label: "Slett",
            color: "red",
            onClick: handleDelete
          },
          {
            label: "Avbryt",
            color: "green",
            onClick: handleShowDelete
          }
        ]}
        isDialogOpen={showDelete}
        handleClose={handleShowDelete}
      />
      <EditQuestion
        question={question}
        isOpen={showEdit}
        onClose={handleShowEdit}
      />
    </Card>
  );
};

export default QuestionCard;
