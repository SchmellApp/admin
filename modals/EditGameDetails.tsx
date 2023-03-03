import { Game } from "@app/types/game";
import React, { FC } from "react";
import { FileInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SubmitButton, ModalBase } from "@app/components";
import { EditGameForm } from "@app/types";
import { editGameValidationSchema, editGameInitialValues } from "@app/lib";
import { useEditGameMutation, useGameFileMutation } from "@app/hooks";

interface EditGameDetailsProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

const EditGameDetails: FC<EditGameDetailsProps> = (props) => {
  const { onClose, game, isOpen } = props;
  const editGame = useEditGameMutation(String(game.id));
  const updateLogo = useGameFileMutation();

  const form = useForm<EditGameForm>({
    initialValues: editGameInitialValues(game.description),
    validate: editGameValidationSchema
  });

  const handleSubmit = async (values: EditGameForm): Promise<void> => {
    await editGame.mutate({
      description: values.description
    });

    if (values.file != null) {
      const data = new FormData();
      data.append("file", values.file);

      await updateLogo.mutateAsync({
        id: String(game.id),
        file: data
      });
    }

    onClose();
  };

  return (
    <ModalBase onClose={onClose} isOpen={isOpen} title={`Endre ${game.name}`}>
      <form
        onSubmit={form.onSubmit((values) => {
          void handleSubmit(values);
        })}
      >
        <Textarea
          withAsterisk
          label="Oppdater beskrivelse"
          my="md"
          {...form.getInputProps("description")}
        />
        <FileInput
          label="Oppdater logo"
          my="md"
          placeholder={game.logo}
          {...form.getInputProps("file")}
        />
        <SubmitButton
          label="Oppdater spill"
          isLoading={editGame.isLoading || updateLogo.isLoading}
        />
      </form>
    </ModalBase>
  );
};

export default EditGameDetails;
