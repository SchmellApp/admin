import React, { FC } from "react";
import { FormProps } from "@/modals/AddQuestion";
import { useForm } from "@mantine/form";
import { Group, JsonInput, Button, useMantineTheme } from "@mantine/core";
import { SubmitButton } from "@/components/Buttons";
import { IconCode } from "@tabler/icons";

const JsonForm: FC<FormProps> = (props) => {
  const { onClose, selectedGame, selectedWeek } = props;

  const emptyJson = [
    {
      type: "",
      questionDescription: "",
      phase: 0,
      function: {},
      punishment: 0,
      relatedWeek: selectedWeek.id,
      relatedGame: selectedGame.id
    }
  ];
  const form = useForm({
    initialValues: {
      json: JSON.stringify(emptyJson, null, 2)
    },
    validate: {
      json: (value) => !(value.length > 0) && "Må legge til minimum et spørsmål"
    }
  });

  const isDarkScheme = useMantineTheme().colorScheme === "dark";

  const handleSubmit = (values: typeof form.values): void => {
    console.log("TODO", JSON.parse(values.json));
    onClose();
  };
  const handleAdd = (): void => {
    const addedElement = [...JSON.parse(form.values.json), ...emptyJson];
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
