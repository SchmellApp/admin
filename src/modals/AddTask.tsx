import React, { FC } from "react";
import {
  TextInput,
  Textarea,
  useMantineTheme,
  Select,
  SegmentedControl,
  Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "@/constants/task";
import { DatePicker } from "@mantine/dates";
import { users } from "@/lib/demo/users/user";
import { toUserControls } from "@/utils/user";
import { SubmitButton } from "@/components/Buttons";
import { ModalBase } from "@/components/Wrappers";
import { createTaskInitialValues } from "@/lib/forms/initialValues/task";
import { createTaskValidationSchema } from "@/lib/forms/validators/task";
import { CreateTaskForm } from "@/types/forms/task";

interface AddTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTask: FC<AddTaskProps> = ({ isOpen, onClose }): JSX.Element => {
  const isDarkScheme = useMantineTheme().colorScheme === "dark";

  const form = useForm<CreateTaskForm>({
    initialValues: createTaskInitialValues,
    validate: createTaskValidationSchema
  });
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til oppgave">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label={"Skriv inn tittel"}
          placeholder={"Fiks bug i appen"}
          my="md"
          {...form.getInputProps("title")}
        />
        <Textarea
          withAsterisk
          label={"Skriv inn beskrivelse"}
          placeholder={"Fant en feil med spillere"}
          my="md"
          {...form.getInputProps("description")}
        />
        <Select
          label="Velg status"
          data={TASK_STATUS}
          my="md"
          color={isDarkScheme ? "yellow" : "dark"}
          {...form.getInputProps("status")}
        />
        <DatePicker
          withAsterisk
          label="Velg frist"
          my="md"
          minDate={new Date()}
          locale="nb"
          {...form.getInputProps("deadline")}
        />
        <Select
          data={TASK_CATEGORY}
          my="md"
          label="Velg kategori"
          withAsterisk
          {...form.getInputProps("category")}
        />
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Text size="sm" weight={500}>
            Velg prioritet
          </Text>
          <SegmentedControl
            data={TASK_PRIORITY}
            fullWidth
            color={isDarkScheme ? "yellow" : "dark"}
            {...form.getInputProps("priority")}
          />
        </div>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Text size="sm" weight={500}>
            Velg ansvarlig
          </Text>
          <SegmentedControl
            data={toUserControls(users)}
            fullWidth
            color={isDarkScheme ? "yellow" : "dark"}
            sx={{
              ".mantine-SegmentedControl-label": {
                display: "flex",
                justifyContent: "center"
              }
            }}
            {...form.getInputProps("priority")}
          />
        </div>

        <SubmitButton label="Opprett oppgave" />
      </form>
    </ModalBase>
  );
};

export default AddTask;
