import { Question } from "@/types/question";
import React, { FC } from "react";
import { useForm } from "@mantine/form";
import { ModalBase } from "@/components/Wrappers";
import {
  FileInput,
  Group,
  NumberInput,
  Textarea,
  TextInput
} from "@mantine/core";
import { SubmitButton } from "@/components/Buttons";
import { editQuestionInitialValues } from "@/lib/forms/initialValues/question";
import { EditQuestionForm } from "@/types/forms/question";
import { editQuestionValidator } from "@/lib/forms/validators/question";

interface EditQuestionProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestion: FC<EditQuestionProps> = (props) => {
  const { isOpen, onClose, question } = props;

  const form = useForm<EditQuestionForm>({
    initialValues: editQuestionInitialValues(question),
    validate: {
      ...editQuestionValidator,
      function: (value: string) =>
        !(value.length > 0) &&
        question.function !== undefined &&
        "Må skrive inn funksjon"
    }
  });

  const handleSubmit = (values: typeof form.values): void => {
    console.log("TODO", values);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Rediger spørsmål">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          placeholder="EdSheeran.png"
          my="md"
          {...form.getInputProps("questionPicture")}
        />
        <SubmitButton label="Oppdater spørsmål" />
      </form>
    </ModalBase>
  );
};

export default EditQuestion;
