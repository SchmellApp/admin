import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Title,
  Text,
  Checkbox,
  useMantineColorScheme,
  MantineColor
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GameStatus } from "@app/enums";
import { SubmitButton, ModalBase } from "@app/components";
import { gameStatusValidationSchema, gameStatusInitialValues } from "@app/lib";
import { GameStatusForm } from "@app/types";
import { useEditGameMutation } from "@app/hooks";

interface ConfirmStatusProps {
  isOpen: boolean;
  id: number;
  onClose: () => void;
  setStatus: Dispatch<SetStateAction<GameStatus>>;
}

const ConfirmStatus: FC<ConfirmStatusProps> = (props) => {
  const { isOpen, id, onClose, setStatus } = props;
  const editGame = useEditGameMutation(String(id));

  const isDarkScheme = useMantineColorScheme().colorScheme === "dark";
  const form = useForm<GameStatusForm>({
    initialValues: gameStatusInitialValues,
    validate: gameStatusValidationSchema
  });

  const color: MantineColor = isDarkScheme ? "yellow" : "dark";

  const handleConfirm = async (): Promise<void> => {
    await editGame.mutate({
      status: GameStatus.DEPLOYED
    });
    onClose();
    setStatus(GameStatus.DEPLOYED);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Er du sikker?">
      <Text color="dimmed" size="sm">
        Ved å endre status til <b>Publisert</b> vil den være synlig i appen
      </Text>
      <Title order={5} mt="md">
        Gå gjennom denne sjekklisten for å bekrefte at alt er klart:
      </Title>
      <form
        onSubmit={form.onSubmit(() => {
          void handleConfirm();
        })}
      >
        <Checkbox
          label="Bekreft at alle forbokstaver er korrekte"
          my="xs"
          color={color}
          {...form.getInputProps("confirmedInitials")}
        />
        <Checkbox
          label="Bekreft at alle endinger er korrekte"
          my="xs"
          color={color}
          {...form.getInputProps("correctEndings")}
        />
        <Checkbox
          label="Bekreft at alle funksjoner er skrevet inn korrekt"
          my="xs"
          color={color}
          {...form.getInputProps("correctFunctions")}
        />
        <Checkbox
          label="Bekreft at grammatikken er korrekt"
          my="xs"
          color={color}
          {...form.getInputProps("correctGrammar")}
        />
        <Checkbox
          label="Bekreft at det har blitt lagt til logo"
          my="xs"
          color={color}
          {...form.getInputProps("addedLogo")}
        />
        <SubmitButton label="Publiser" isLoading={editGame.isLoading} />
      </form>
    </ModalBase>
  );
};

export default ConfirmStatus;
