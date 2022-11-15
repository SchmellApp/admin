import React, { FC } from "react";
import { FormProps } from "@app/modals/AddQuestion";
import { useForm } from "@mantine/form";
import { FileInput, NumberInput, Textarea, TextInput } from "@mantine/core";
import { SubmitButton } from "@app/components";
import { createQuestionInitialValues, createQuestionValidator } from "@app/lib";
import { CreateQuestionForm, CreateQuestion } from "@app/types";
import { useQuestionFileMutation, useQuestionMutation } from "@app/hooks";

const NormalForm: FC<FormProps> = ({ onClose, selectedWeek, selectedGame }) => {
  const addQuestion = useQuestionMutation();
  const fileMutation = useQuestionFileMutation();
  const form = useForm<CreateQuestionForm>({
    initialValues: createQuestionInitialValues(
      selectedGame.id,
      selectedWeek.id
    ),
    validate: createQuestionValidator
  });

  const handleSubmit = async (values: CreateQuestionForm): Promise<void> => {
    const createdQuestion = await addQuestion.mutateAsync(
      values as CreateQuestion
    );
    if (values.file !== undefined) {
      await fileMutation.mutate({
        id: String(createdQuestion.id),
        file: values.file
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
      <TextInput
        label="Skriv inn funksjon"
        placeholder='{"answer":"svar"}'
        my="md"
        {...form.getInputProps("function")}
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
      <SubmitButton label="Opprett spørsmål" />
    </form>
  );
};

export default NormalForm;
