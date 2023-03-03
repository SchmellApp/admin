import React from "react";
import {
  SegmentedControl,
  Select,
  Text,
  Textarea,
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "@app/constants";
import { DatePicker } from "@mantine/dates";
import { toOptions, toUserControls } from "@app/utils";
import { ModalBase, SubmitButton } from "@app/components";
import { createTaskInitialValues, createTaskValidationSchema } from "@app/lib";
import { CreateTaskForm } from "@app/types";
import {
  useGamesQuery,
  useTaskMutation,
  useTheme,
  useUsersQuery
} from "@app/hooks";
import { TaskCategory } from "@app/enums";

interface AddTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTask = ({ isOpen, onClose }: AddTaskProps): JSX.Element => {
  const addTask = useTaskMutation();
  const { data: users } = useUsersQuery();
  const { data: games } = useGamesQuery();
  const { isDark } = useTheme();

  const form = useForm<CreateTaskForm>({
    initialValues: createTaskInitialValues,
    validate: createTaskValidationSchema
  });

  const handleSubmit = async (values: CreateTaskForm): Promise<void> => {
    await addTask.mutateAsync({
      ...values,
      responsibleUser: Number(values.responsibleUser)
    });
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til oppgave">
      <form
        onSubmit={form.onSubmit((values) => {
          void handleSubmit(values);
        })}
      >
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
          color={isDark ? "yellow" : "dark"}
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
        {games !== undefined && form.values.category === TaskCategory.GAMES && (
          <Select
            data={toOptions(games)}
            my="md"
            label="Velg relatert spill"
            withAsterisk
            {...form.getInputProps("relatedGame")}
          />
        )}
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Text size="sm" weight={500}>
            Velg prioritet
          </Text>
          <SegmentedControl
            data={TASK_PRIORITY}
            fullWidth
            color={isDark ? "yellow" : "dark"}
            {...form.getInputProps("priority")}
          />
        </div>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Text size="sm" weight={500}>
            Velg ansvarlig
          </Text>
          {users !== undefined && (
            <SegmentedControl
              data={toUserControls(users)}
              fullWidth
              color={isDark ? "yellow" : "dark"}
              sx={{
                ".mantine-SegmentedControl-label": {
                  display: "flex",
                  justifyContent: "center"
                }
              }}
              {...form.getInputProps("responsibleUser")}
            />
          )}
        </div>

        <SubmitButton label="Opprett oppgave" />
      </form>
    </ModalBase>
  );
};

export default AddTask;
