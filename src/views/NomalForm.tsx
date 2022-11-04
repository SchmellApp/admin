import React, { FC } from "react";
import { FormProps } from "@/modals/AddQuestion";
import { useForm } from "@mantine/form";
import { FileInput, NumberInput, Textarea, TextInput } from "@mantine/core";
import { SubmitButton } from "@/components/Buttons";
import { createQuestionInitialValues } from "@/lib/forms/initialValues/question";
import { createQuestionValidator } from "@/lib/forms/validators/question";
import { CreateQuestionForm } from "@/types/forms/question";

const NormalForm: FC<FormProps> = ({ onClose, selectedWeek, selectedGame }) => {
  const form = useForm<CreateQuestionForm>({
    initialValues: createQuestionInitialValues(
      selectedGame.id,
      selectedWeek.id
    ),
    validate: createQuestionValidator
  });

  const handleSubmit = (values: typeof form.values): void => {
    console.log("TODO", values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
        {...form.getInputProps("questionPicture")}
      />
      <SubmitButton label="Opprett spørsmål" />
    </form>
  );
};

export default NormalForm;
