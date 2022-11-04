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

interface EditQuestionProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestion: FC<EditQuestionProps> = (props) => {
  const { isOpen, onClose, question } = props;

  const form = useForm({
    initialValues: {
      id: question.id,
      type: question.type,
      questionDescription: question.questionDescription,
      phase: question.phase,
      function: question.function,
      punishment: question.punishment,
      questionPicture: new File([], question.questionPicture ?? "")
    },
    validate: {
      type: (value) => !(value.length > 0) && "Må skrive inn type",
      questionDescription: (value) =>
        !(value.length > 0) && "Må skrive inn spørsmål",
      phase: (value) => value === 0 && "Må skrive inn fase",
      function: (value: string) =>
        !(value.length > 0) &&
        question.function?.length !== undefined &&
        "Må skrive inn funksjon",
      punishment: (value) => value === 0 && "Må skrive inn straff",
      questionPicture: (value) => value === null && "Må laste opp bilde"
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
        <Group position="right" my="md">
          <SubmitButton label="Oppdater spørsmål" />
        </Group>
      </form>
    </ModalBase>
  );
};

export default EditQuestion;
