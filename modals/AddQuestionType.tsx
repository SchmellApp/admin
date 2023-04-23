import { useAddQuestionType } from "@app/hooks";
import { useForm } from "@mantine/form";
import { CreateQuestionTypeForm } from "@app/types";
import {
  createQuestionTypeInitialValues,
  createQuestionTypeValidator
} from "@app/lib";
import { ModalBase, SubmitButton } from "@app/components";
import { ColorInput, Textarea, TextInput } from "@mantine/core";
import React from "react";

interface AddQuestionTypeProps {
  onClose: () => void;
  isOpen: boolean;
}

const AddQuestionType = ({
  isOpen,
  onClose
}: AddQuestionTypeProps): JSX.Element => {
  const { mutateAsync: addQuestion, isLoading: isAdding } =
    useAddQuestionType();

  const form = useForm<CreateQuestionTypeForm>({
    initialValues: createQuestionTypeInitialValues,
    validate: createQuestionTypeValidator
  });

  const handleSubmit = async (
    values: CreateQuestionTypeForm
  ): Promise<void> => {
    await addQuestion(values);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til ny type">
      <form
        onSubmit={form.onSubmit((values) => {
          void handleSubmit(values);
        })}
      >
        <TextInput
          withAsterisk
          label="Oppdater navn"
          placeholder="Pekelek"
          my="md"
          {...form.getInputProps("name")}
        />
        <ColorInput
          withAsterisk
          label="Oppdater farge"
          placeholder="#FFD700"
          my="md"
          {...form.getInputProps("hexColor")}
        />
        <Textarea
          withAsterisk
          label="Oppdater hint"
          placeholder="Dere får en påstand og noen teller ned fra tre. Deretter skal man peke på den man mener påstanden passer best til."
          my="md"
          {...form.getInputProps("hint")}
        />
        <SubmitButton
          label={isAdding ? "Oppretter..." : "Opprett"}
          isLoading={isAdding}
        />
      </form>
    </ModalBase>
  );
};

export default AddQuestionType;
