import { Question, EditQuestionForm } from "@app/types";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { ModalBase, SubmitButton } from "@app/components";
import {
  FileInput,
  Group,
  NumberInput,
  Select,
  Switch,
  Textarea,
  TextInput,
  Title
} from "@mantine/core";
import { editQuestionInitialValues, editQuestionValidator } from "@app/lib";
import {
  useQuestionFileMutation,
  useEditQuestionMutation,
  useTheme,
  useQuestionTypes
} from "@app/hooks";
import { toUpdateQuestion } from "@app/utils";

interface EditQuestionProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestion = ({
  isOpen,
  onClose,
  question
}: EditQuestionProps): JSX.Element => {
  const [showFunctionSettings, setShowFunctionSettings] = useState(false);

  const { mutateAsync: editQuestion, isLoading: isEditing } =
    useEditQuestionMutation(question.id);
  const { mutateAsync: addFile, isLoading: isAddingFile } =
    useQuestionFileMutation();

  const { data: questionTypes } = useQuestionTypes();
  const { isDark } = useTheme();

  const form = useForm<EditQuestionForm>({
    initialValues: editQuestionInitialValues(question),
    validate: editQuestionValidator
  });

  const handleSubmit = async (values: EditQuestionForm): Promise<void> => {
    await editQuestion(toUpdateQuestion(values));
    if (values.file !== undefined) {
      const data = new FormData();
      data.append("file", values.file);

      await addFile({
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
          label="Oppdater spørsmål"
          isLoading={isEditing || isAddingFile}
        />
      </form>
    </ModalBase>
  );
};

export default EditQuestion;
