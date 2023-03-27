import {
  Checkbox,
  Divider,
  FileInput,
  Textarea,
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { SubmitButton, ModalBase } from "@app/components";
import { createGameInitialValues, createGameValidationSchema } from "@app/lib";
import { CreateGameForm } from "@app/types";
import { useGameFileMutation, useGameMutation, useTheme } from "@app/hooks";

interface AddGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGame = ({ isOpen, onClose }: AddGameProps): JSX.Element => {
  const { isDark } = useTheme();
  const gameMutation = useGameMutation();
  const fileMutation = useGameFileMutation();
  const form = useForm<CreateGameForm>({
    initialValues: createGameInitialValues,
    validate: {
      ...createGameValidationSchema,
      confirmWithoutImage: (value: boolean): string | null =>
        form.values.file === undefined && !value
          ? "Du må bekrefte at du vil legge til spillet uten bilde"
          : null
    }
  });

  const handleSubmit = async (values: CreateGameForm): Promise<void> => {
    const createdGame = await gameMutation.mutateAsync(values);

    if (createdGame !== undefined && values.file !== undefined) {
      const data = new FormData();
      data.append("file", values.file);

      fileMutation.mutate({
        id: String(createdGame.id),
        file: data
      });
    }

    form.reset();
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Legg til nytt spill">
      <form
        onSubmit={form.onSubmit((values) => {
          void handleSubmit(values);
        })}
      >
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
        <Divider my="xs" />
        <FileInput
          label="Last opp logo"
          placeholder="StartVorset.png"
          accept="image/png,image/jpeg"
          my="md"
          {...form.getInputProps("file")}
        />
        {form.values.file === undefined && (
          <Checkbox
            label="Bekreft at du vil legge til spillet uten bilde"
            color={isDark ? "yellow" : "dark"}
            {...form.getInputProps("confirmWithoutImage")}
          />
        )}
        <Divider my="xs" />
        <Checkbox
          label="Spillet er familievennlig"
          color={isDark ? "yellow" : "dark"}
          labelPosition="right"
          {...form.getInputProps("isFamilyFriendly")}
        />

        <SubmitButton
          label="Opprett spill"
          isLoading={gameMutation.isLoading}
        />
      </form>
    </ModalBase>
  );
};

export default AddGame;
