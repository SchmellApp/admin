import React, { useState } from "react";
import {
  FileInput,
  Group,
  MultiSelect,
  NumberInput,
  SegmentedControl,
  Select,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title
} from "@mantine/core";
import { CreateQuestionForm, Game } from "@app/types";
import { ModalBase, SubmitButton } from "@app/components";
import {
  useQuestionFileMutation,
  useQuestionMutation,
  useQuestionTypes,
  useTheme
} from "@app/hooks";
import { useForm } from "@mantine/form";
import { createQuestionInitialValues, createQuestionValidator } from "@app/lib";
import { toCreateQuestion } from "@app/utils";
import { GroupSizes, WeekNumbers } from "@app/constants";

interface AddQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGame: Game;
}

const AddQuestion = ({
  isOpen,
  onClose,
  selectedGame
}: AddQuestionProps): JSX.Element => {
  const [showFunctionSettings, setShowFunctionSettings] = useState(false);

  const { mutateAsync: addQuestion, isLoading: isAdding } =
    useQuestionMutation();
  const { mutateAsync: addFile, isLoading: isAddingFile } =
    useQuestionFileMutation();
  const form = useForm<CreateQuestionForm>({
    initialValues: createQuestionInitialValues(selectedGame.id),
    validate: createQuestionValidator
  });
  const { data: questionTypes } = useQuestionTypes();
  const { isDark } = useTheme();

  const handleSubmit = async (values: CreateQuestionForm): Promise<void> => {
    const createdQuestion = await addQuestion(toCreateQuestion(values));
    if (values.file !== undefined) {
      const data = new FormData();
      data.append("file", values.file);

      await addFile({
        id: String(createdQuestion.id),
        file: data
      });
    }

    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til spørsmål">
      <form
        onSubmit={form.onSubmit((values) => {
          void handleSubmit(values);
        })}
      >
        <Select
          withAsterisk
          label="Velg type"
          placeholder="Pekelek"
          my="md"
          searchable
          data={
            questionTypes != null
              ? questionTypes.map((type) => ({
                  label: type.name,
                  value: String(type.id)
                }))
              : []
          }
          {...form.getInputProps("relatedQuestionType")}
        />
        <Textarea
          withAsterisk
          label="Skriv inn spørsmål"
          placeholder="Pek på den fulleste personen"
          my="md"
          {...form.getInputProps("questionDescription")}
        />
        <NumberInput
          withAsterisk
          label="Skriv inn fase"
          placeholder="1"
          my="md"
          {...form.getInputProps("phase")}
        />
        <NumberInput
          label="Skriv inn straff"
          placeholder="4"
          my="md"
          {...form.getInputProps("punishment")}
        />
        <MultiSelect
          withAsterisk
          data={WeekNumbers}
          label="Velg uker"
          my="md"
          searchable
          clearable
          placeholder="Uke 1, Uke 2, Uke 3, ..., Uke 52"
          {...form.getInputProps("activeWeeks")}
        />
        <FileInput
          label="Last opp bilde"
          placeholder="EdSheeran.png"
          my="md"
          {...form.getInputProps("file")}
        />
        <Group position="apart">
          <Text size="sm" weight={500} color={isDark ? "white" : "dark"}>
            Gruppestørrelse
          </Text>
          <SegmentedControl
            data={GroupSizes}
            {...form.getInputProps("groupSize")}
          />
        </Group>
        <Group position="apart">
          <Title order={4} color={isDark ? "white" : "dark"}>
            Legg til funksjon
          </Title>
          <Switch
            size="md"
            checked={showFunctionSettings}
            color={isDark ? "yellow" : "dark"}
            onChange={(event) =>
              setShowFunctionSettings(event.currentTarget.checked)
            }
          />
        </Group>
        {showFunctionSettings && (
          <>
            <NumberInput
              label="Skriv inn antall sekunder"
              placeholder="Timer for et spørsmål"
              {...form.getInputProps("timer")}
              my="sm"
            />
            <TextInput
              label="Skriv inn et svar"
              placeholder="Eksempelvis svaret til Guess The Gibberish"
              my="sm"
              {...form.getInputProps("answer")}
            />
            <TextInput
              label="Skriv inn utfordringer (separer med komma)"
              placeholder="Eksempelvis: 'Skriv et dikt', 'Skriv en sang', 'Skriv en historie'"
              my="sm"
              {...form.getInputProps("challenges")}
            />
            <TextInput
              label="Skriv inn spørsmål (separer med komma)"
              placeholder="Eksempelvis: 'Hva er din favorittfarge?', 'Hva er din favorittmat?'"
              my="sm"
              {...form.getInputProps("questions")}
            />
            <TextInput
              label="Skriv inn svaralternativer (separer med komma)"
              placeholder="Eksempelvis: 'Rød', 'Blå', 'Grønn'"
              my="sm"
              {...form.getInputProps("options")}
            />
          </>
        )}
        <SubmitButton
          label="Opprett spørsmål"
          isLoading={isAdding || isAddingFile}
        />
      </form>
    </ModalBase>
  );
};

export default AddQuestion;
