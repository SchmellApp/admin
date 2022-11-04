import {
  Checkbox,
  FileInput,
  SegmentedControl,
  Text,
  Textarea,
  TextInput,
  useMantineTheme
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GameStatus } from "@/enums/game";
import React, { FC } from "react";
import { GAME_STATUS } from "@/constants/game";
import { SubmitButton } from "@/components/Buttons";
import { ModalBase } from "@/components/Wrappers";

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
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til nytt spill">
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
        <SubmitButton label="Opprett spill" />
      </form>
    </ModalBase>
  );
};

export default AddGame;
