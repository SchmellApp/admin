import { Question, EditQuestionForm } from "@app/types";
import React, { FC } from "react";
import { useForm } from "@mantine/form";
import { ModalBase, SubmitButton } from "@app/components";
import {
  FileInput,
  NumberInput,
  Textarea,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import { editQuestionInitialValues, editQuestionValidator } from "@app/lib";
import { useQuestionFileMutation, useEditQuestionMutation } from "@app/hooks";
import { toUpdateQuestion } from "@app/utils";

interface EditQuestionProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestion: FC<EditQuestionProps> = (props) => {
  const { isOpen, onClose, question } = props;
  const editQuestion = useEditQuestionMutation(question.id);
  const addFile = useQuestionFileMutation();

  const isDarkScheme = useMantineTheme().colorScheme === "dark";

  const form = useForm<EditQuestionForm>({
    initialValues: editQuestionInitialValues(question),
    validate: editQuestionValidator
  });

  const handleSubmit = async (values: EditQuestionForm): Promise<void> => {
    await editQuestion.mutateAsync(toUpdateQuestion(values));
    if (values.file !== undefined) {
      const data = new FormData();
      data.append("file", values.file);

      await addFile.mutateAsync({
        id: String(question.id),
        file: data
      });
    }
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Rediger spørsmål">
      <form
        onSubmit={form.onSubmit((values) => {
          void handleSubmit(values);
        })}
      >
        <TextInput
          withAsterisk
          label="Oppdater type"
          placeholder="Pekelek"
          my="md"
          {...form.getInputProps("type")}
        />
        <Textarea
          withAsterisk
          label="Oppdater beskrivelse"
          placeholder="Pek på den fulleste personen"
          my="md"
          {...form.getInputProps("questionDescription")}
        />
        <NumberInput
          withAsterisk
          label="Oppdater fase"
          placeholder="1"
          my="md"
          {...form.getInputProps("phase")}
        />
        <NumberInput
          withAsterisk
          label="Oppdater straff"
          placeholder="4"
          my="md"
          {...form.getInputProps("punishment")}
        />
        <FileInput
          label="Oppdater bilde"
          placeholder={question.questionPicture ?? "EdSheeran.png"}
          my="md"
          {...form.getInputProps("file")}
        />
        <Title order={4} color={isDarkScheme ? "white" : "dark"}>
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
          label="Oppdater spørsmål"
          isLoading={editQuestion.isLoading || addFile.isLoading}
        />
      </form>
    </ModalBase>
  );
};

export default EditQuestion;
