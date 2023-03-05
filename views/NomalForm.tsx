import React from "react";
import { FormProps } from "@app/modals/AddQuestion";
import { useForm } from "@mantine/form";
import {
  FileInput,
  NumberInput,
  Textarea,
  TextInput,
  Title
} from "@mantine/core";
import { SubmitButton } from "@app/components";
import { createQuestionInitialValues, createQuestionValidator } from "@app/lib";
import { CreateQuestionForm } from "@app/types";
import {
  useQuestionFileMutation,
  useQuestionMutation,
  useTheme
} from "@app/hooks";
import { toCreateQuestion } from "@app/utils";

const NormalForm = ({
  onClose,
  selectedWeek,
  selectedGame
}: FormProps): JSX.Element => {
  const addQuestion = useQuestionMutation();
  const fileMutation = useQuestionFileMutation();
  const form = useForm<CreateQuestionForm>({
    initialValues: createQuestionInitialValues(
      selectedGame.id,
      selectedWeek.id
    ),
    validate: createQuestionValidator
  });
  const { isDark } = useTheme();

  const handleSubmit = async (values: CreateQuestionForm): Promise<void> => {
    const createdQuestion = await addQuestion.mutateAsync(
      toCreateQuestion(values)
    );
    if (values.file !== undefined) {
      const data = new FormData();
      data.append("file", values.file);

      await fileMutation.mutate({
        id: String(createdQuestion.id),
        file: data
      });
    }

    onClose();
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        void handleSubmit(values);
      })}
    >
      <TextInput
        withAsterisk
        label="Skriv inn type"
        placeholder="Pekelek"
        my="md"
        {...form.getInputProps("type")}
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
        withAsterisk
        label="Skriv inn straff"
        placeholder="4"
        my="md"
        {...form.getInputProps("punishment")}
      />
      <FileInput
        label="Last opp bilde"
        placeholder="EdSheeran.png"
        my="md"
        {...form.getInputProps("file")}
      />
      <Title order={4} color={isDark ? "white" : "dark"}>
        Legg til funksjon
      </Title>
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
      <SubmitButton
        label="Opprett spørsmål"
        isLoading={addQuestion.isLoading}
      />
    </form>
  );
};

export default NormalForm;
