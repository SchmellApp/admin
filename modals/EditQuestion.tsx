import { Question, EditQuestionForm } from "@app/types";
import React, { FC } from "react";
import { useForm } from "@mantine/form";
import { ModalBase, SubmitButton } from "@app/components";
import { FileInput, NumberInput, Textarea, TextInput } from "@mantine/core";
import { editQuestionInitialValues, editQuestionValidator } from "@app/lib";
import { useQuestionFileMutation, useEditQuestionMutation } from "@app/hooks";

interface EditQuestionProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestion: FC<EditQuestionProps> = (props) => {
  const { isOpen, onClose, question } = props;
  const editQuestion = useEditQuestionMutation(question.id);
  const addFile = useQuestionFileMutation();

  const form = useForm<EditQuestionForm>({
    initialValues: editQuestionInitialValues(question),
    validate: {
      ...editQuestionValidator,
      function: (value: string) =>
        !(value.length > 0) &&
        question.function !== undefined &&
        question.function.length > 0 &&
        "Må skrive inn funksjon"
    }
  });

  const handleSubmit = async (values: EditQuestionForm): Promise<void> => {
    await editQuestion.mutateAsync(values);
    if (values.file !== undefined) {
      await addFile.mutate({
        id: question.id,
        file: values.file
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
        <TextInput
          label="Oppdater funksjon"
          placeholder='{"answer":"svar"}'
          my="md"
          {...form.getInputProps("function")}
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
        <SubmitButton
          label="Oppdater spørsmål"
          isLoading={editQuestion.isLoading || addFile.isLoading}
        />
      </form>
    </ModalBase>
  );
};

export default EditQuestion;
