import React from "react";
import { EditQuestionTypeForm, QuestionType } from "@app/types";
import { useEditQuestionType } from "@app/hooks";
import { useForm } from "@mantine/form";
import {
  editQuestionTypeInitialValues,
  editQuestionTypeValidator
} from "@app/lib";
import { ModalBase, SubmitButton } from "@app/components";
import { ColorInput, Textarea, TextInput } from "@mantine/core";

interface EditQuestionTypeProps {
  questionType: QuestionType;
  isOpen: boolean;
  onClose: () => void;
}

const EditQuestionType = ({
  questionType,
  onClose,
  isOpen
}: EditQuestionTypeProps): JSX.Element => {
  const { mutateAsync: editQuestionType, isLoading: isUpdating } =
    useEditQuestionType(questionType.id);

  const form = useForm<EditQuestionTypeForm>({
    initialValues: editQuestionTypeInitialValues(questionType),
    validate: editQuestionTypeValidator
  });

  const handleSubmit = async (values: EditQuestionTypeForm): Promise<void> => {
    await editQuestionType(values);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Rediger type">
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
          label={isUpdating ? "Oppdaterer..." : "Oppdater"}
          isLoading={isUpdating}
        />
      </form>
    </ModalBase>
  );
};

export default EditQuestionType;
