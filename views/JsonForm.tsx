import React from "react";
import { FormProps } from "@app/modals/AddQuestion";
import { useForm } from "@mantine/form";
import { Group, JsonInput, Button } from "@mantine/core";
import { SubmitButton } from "@app/components";
import { IconCode } from "@tabler/icons";
import {
  createQuestionJsonInitialValues,
  createQuestionJsonValidator
} from "@app/lib";
import { getEmptyJson } from "@app/utils";
import { CreateQuestionJsonForm, CreateQuestion } from "@app/types";
import { useQuestionManyMutation, useTheme } from "@app/hooks";

const JsonForm = (props: FormProps): JSX.Element => {
  const { onClose, selectedGame, selectedWeek } = props;
  const { isDark } = useTheme();
  const addQuestions = useQuestionManyMutation();

  const form = useForm<CreateQuestionJsonForm>({
    initialValues: createQuestionJsonInitialValues(
      selectedGame.id,
      selectedWeek.id
    ),
    validate: createQuestionJsonValidator
  });

  const handleSubmit = async (
    values: CreateQuestionJsonForm
  ): Promise<void> => {
    const questions: CreateQuestion[] = JSON.parse(values.json);
    addQuestions.mutate(questions);
    onClose();
  };
  const handleAdd = (): void => {
    const addedElement = [
      ...JSON.parse(form.values.json),
      ...getEmptyJson(selectedWeek.id, selectedGame.id)
    ];
    form.setFieldValue("json", JSON.stringify(addedElement, null, 2));
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        void handleSubmit(values);
      })}
    >
      <Group position="right">
        <Button
          onClick={handleAdd}
          variant="light"
          color={isDark ? "yellow" : "dark"}
          my="xs"
          rightIcon={<IconCode />}
        >
          Legg til element
        </Button>
      </Group>
      <JsonInput
        placeholder={'{"json": "value"}'}
        minRows={20}
        formatOnBlur
        validationError="Ugyldig JSON"
        size="md"
        {...form.getInputProps("json")}
      />
      <SubmitButton
        label="Opprett spørsmål"
        isLoading={addQuestions.isLoading}
      />
    </form>
  );
};

export default JsonForm;
