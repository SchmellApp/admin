import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Title,
  Text,
  Checkbox,
  useMantineColorScheme,
  MantineColor
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GameStatus } from "@/enums/game";
import { SubmitButton } from "@/components/Buttons";
import { ModalBase } from "@/components/Wrappers";
import { gameStatusValidationSchema } from "@/lib/forms/validators/game";
import { gameStatusInitialValues } from "@/lib/forms/initialValues/game";
import { GameStatusForm } from "@/types/forms/game";

interface ConfirmStatusProps {
  isOpen: boolean;
  id: number;
  onClose: () => void;
  setStatus: Dispatch<SetStateAction<GameStatus>>;
}

const ConfirmStatus: FC<ConfirmStatusProps> = (props) => {
  const { isOpen, id, onClose, setStatus } = props;

  const isDarkScheme = useMantineColorScheme().colorScheme === "dark";
  const form = useForm<GameStatusForm>({
    initialValues: gameStatusInitialValues,
    validate: gameStatusValidationSchema
  });

  const color: MantineColor = isDarkScheme ? "yellow" : "dark";

  const handleConfirm = (): void => {
    console.log(id);
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
      <form onSubmit={form.onSubmit(handleConfirm)}>
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
        <SubmitButton label="Publiser" />
      </form>
    </ModalBase>
  );
};

export default ConfirmStatus;
