import { Game } from "@/types/game";
import React, { FC } from "react";
import { FileInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SubmitButton } from "@/components/Buttons";
import { ModalBase } from "@/components/Wrappers";
import { EditGameForm } from "@/types/forms/game";
import { editGameValidationSchema } from "@/lib/forms/validators/game";
import { editGameInitialValues } from "@/lib/forms/initialValues/game";

interface EditGameDetailsProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

const EditGameDetails: FC<EditGameDetailsProps> = (props) => {
  const { onClose, game, isOpen } = props;

  const form = useForm<EditGameForm>({
    initialValues: editGameInitialValues(game.description, game.logo),
    validate: editGameValidationSchema
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
