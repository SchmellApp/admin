import { Game } from "@/types/game";
import React, { FC } from "react";
import { FileInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SubmitButton } from "@/components/Buttons";
import { ModalBase } from "@/components/Wrappers";

interface EditGameDetailsProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

const EditGameDetails: FC<EditGameDetailsProps> = (props) => {
  const { onClose, game, isOpen } = props;

  const form = useForm({
    initialValues: {
      description: game.description,
      logo: new File([], game.logo)
    },
    validate: {
      description: (value) => !(value.length > 0) && "Beskrivelse er påkrevd",
      logo: (value) => value === null && "Logo er påkrevd"
    }
  });

  const handleSubmit = (values: unknown): void => {
    console.log("TODO", values);
  };

  return (
    <ModalBase onClose={onClose} isOpen={isOpen} title={`Endre ${game.name}`}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          withAsterisk
          label="Oppdater beskrivelse"
          my="md"
          {...form.getInputProps("description")}
        />
        <FileInput
          withAsterisk
          label="Oppdater logo"
          my="md"
          placeholder={game.logoUrl}
          {...form.getInputProps("logo")}
        />
        <SubmitButton label="Oppdater spill" />
      </form>
    </ModalBase>
  );
};

export default EditGameDetails;
