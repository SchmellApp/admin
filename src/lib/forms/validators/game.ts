import { FormRulesRecord } from "@mantine/form/lib/types";
import {
  CreateGameForm,
  EditGameForm,
  GameStatusForm
} from "@/types/forms/game";

export const createGameValidationSchema: FormRulesRecord<CreateGameForm> = {
  name: (value) => !(value.length > 0) && "Tittel er påkrevd",
  description: (value) => !(value.length > 0) && "Beskrivelse er påkrevd"
};

export const editGameValidationSchema: FormRulesRecord<EditGameForm> = {
  description: (value) => !(value.length > 0) && "Beskrivelse er påkrevd",
  logo: (value) => !(value.length > 0) && "Logo er påkrevd"
};

export const gameStatusValidationSchema: FormRulesRecord<GameStatusForm> = {
  confirmedInitials: (value: boolean) =>
    !value && "Du må bekrefte at du har sjekket forbokstaver",
  correctEndings: (value: boolean) =>
    !value && "Du må bekrefte at alle endinger er korrekt",
  correctFunctions: (value: boolean) =>
    !value && "Du må bekrefte at alle funksjoner er skrevet inn korrekt",
  correctGrammar: (value: boolean) =>
    !value && "Du må bekrefte at grammatikken er korrekt"
};
