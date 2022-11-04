import React, { FC } from "react";
import { FormProps } from "@/modals/AddQuestion";
import { useForm } from "@mantine/form";
import { Group, JsonInput, Button, useMantineTheme } from "@mantine/core";
import { SubmitButton } from "@/components/Buttons";
import { IconCode } from "@tabler/icons";
import { createQuestionJsonInitialValues } from "@/lib/forms/initialValues/question";
import { getEmptyJson } from "@/utils/question";
import { CreateQuestionJsonForm } from "@/types/forms/question";
import { createQuestionJsonValidator } from "@/lib/forms/validators/question";

const JsonForm: FC<FormProps> = (props) => {
  const { onClose, selectedGame, selectedWeek } = props;

  const form = useForm<CreateQuestionJsonForm>({
    initialValues: createQuestionJsonInitialValues(
      selectedGame.id,
      selectedWeek.id
    ),
    validate: createQuestionJsonValidator
  });

  const isDarkScheme = useMantineTheme().colorScheme === "dark";

  const handleSubmit = (values: typeof form.values): void => {
    console.log("TODO", JSON.parse(values.json));
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
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Group position="right">
        <Button
          onClick={handleAdd}
          variant="light"
          color={isDarkScheme ? "yellow" : "dark"}
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
      <SubmitButton label="Opprett spørsmål" />
    </form>
  );
};

export default JsonForm;
