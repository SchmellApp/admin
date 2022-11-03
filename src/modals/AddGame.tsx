import {
  Button,
  Checkbox,
  FileInput,
  Group,
  Modal,
  SegmentedControl,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GameStatus } from "../enums/game";
import React, { FC } from "react";
import { GAME_STATUS } from "../constants/game";
import { IconCirclePlus } from "@tabler/icons";

interface AddGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGame: FC<AddGameProps> = ({ isOpen, onClose }): JSX.Element => {
  const isDarkScheme = useMantineTheme().colorScheme === "dark";

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      status: GameStatus.DEVELOPMENT,
      logo: null,
      confirmWithoutImage: false
    },
    validate: {
      name: (value) => !(value.length > 0) && "Tittel er påkrevd",
      description: (value) => !(value.length > 0) && "Beskrivelse er påkrevd",
      confirmWithoutImage: (value: boolean): string | null =>
        form.values.logo === null && !value
          ? "Du må bekrefte at du vil legge til spillet uten bilde"
          : null
    }
  });

  return (
    <Modal opened={isOpen} onClose={onClose} centered size="lg" padding="xl">
      <Title order={3} color={isDarkScheme ? "white" : "dark"}>
        Legg til spill
      </Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label={"Gi spillet et navn"}
          placeholder={"Start Vorset"}
          my="md"
          {...form.getInputProps("name")}
        />
        <Textarea
          withAsterisk
          label={"Skriv inn beskrivelse"}
          placeholder={"Start Vorset er et kult spill"}
          my="md"
          {...form.getInputProps("description")}
        />
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <Text size="sm" weight={500}>
            Velg status
          </Text>
          <SegmentedControl
            data={GAME_STATUS}
            fullWidth
            color={isDarkScheme ? "yellow" : "dark"}
            {...form.getInputProps("status")}
          />
        </div>
        <FileInput
          label="Last opp logo"
          placeholder="StartVorset.png"
          accept="image/png,image/jpeg"
          my="md"
          {...form.getInputProps("logo")}
        />
        {form.values.logo === null && (
          <Checkbox
            label="Bekreft at du vil legge til spillet uten bilde"
            {...form.getInputProps("confirmWithoutImage")}
          />
        )}
        <Group position="right" mt="xl">
          <Button
            type="submit"
            color={isDarkScheme ? "yellow" : "dark"}
            variant="light"
            rightIcon={<IconCirclePlus />}
          >
            Opprett spill
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddGame;
