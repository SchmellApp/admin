import React, { FC } from "react";
import {
  Group,
  Modal,
  TextInput,
  Button,
  Textarea,
  useMantineTheme,
  Select,
  Title,
  SegmentedControl,
  Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TaskStatus } from "../types/task/status";
import { TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "../constants/task";
import { DatePicker } from "@mantine/dates";
import { users } from "../lib/demo/users/user";
import { parseUserToFilter } from "../utils/task/user";
import { IconCirclePlus } from "@tabler/icons";

interface AddTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTask: FC<AddTaskProps> = ({ isOpen, onClose }): JSX.Element => {
  const isDarkScheme = useMantineTheme().colorScheme === "dark";

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      status: TaskStatus.PENDING,
      category: "",
      deadline: new Date(),
      priority: "",
      responsible: "1"
    },
    validate: {
      title: (value) => !(value.length > 0) && "Tittel er påkrevd",
      description: (value) => !(value.length > 0) && "Beskrivelse er påkrevd",
      category: (value) => !(value.length > 0) && "Kategori er påkrevd",
      priority: (value) => !(value.length > 0) && "Prioritet er påkrevd",
      responsible: (value) => !(value.length > 0) && "Ansvarlig er påkrevd"
    }
  });
  return (
    <Modal opened={isOpen} onClose={onClose} centered size="lg" padding="xl">
      <Title order={3} color={isDarkScheme ? "white" : "dark"}>
        Legg til oppgave
      </Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label={"Skriv inn tittel"}
          placeholder={"Fiks bug i appen"}
          mt="md"
          mb="md"
          {...form.getInputProps("title")}
        />
        <Textarea
          withAsterisk
          label={"Skriv inn beskrivelse"}
          placeholder={"Fant en feil med spillere"}
          mt="md"
          mb="md"
          {...form.getInputProps("description")}
        />
        <Select
          label="Velg status"
          data={TASK_STATUS}
          mt="md"
          mb="md"
          color={isDarkScheme ? "yellow" : "dark"}
          {...form.getInputProps("status")}
        />
        <DatePicker
          withAsterisk
          label="Velg frist"
          mt="md"
          mb="md"
          minDate={new Date()}
          locale="nb"
          {...form.getInputProps("deadline")}
        />
        <Select
          data={TASK_CATEGORY}
          mt="md"
          mb="md"
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
            data={parseUserToFilter(users)}
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

        <Group position="right" mt="xl">
          <Button
            type="submit"
            color={isDarkScheme ? "yellow" : "dark"}
            variant="light"
            rightIcon={<IconCirclePlus />}
          >
            Opprett oppgave
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddTask;
