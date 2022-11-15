import { FormRulesRecord } from "@mantine/form/lib/types";
import { CreateGameForm, EditGameForm, GameStatusForm } from "@app/types";

export const createGameValidationSchema: FormRulesRecord<CreateGameForm> = {
  name: (value: string) => !(value.length > 0) && "Tittel er påkrevd",
  description: (value: string) =>
    !(value.length > 0) && "Beskrivelse er påkrevd"
};

export const editGameValidationSchema: FormRulesRecord<EditGameForm> = {
  description: (value: string) =>
    !(value.length > 0) && "Beskrivelse er påkrevd"
};

export const gameStatusValidationSchema: FormRulesRecord<GameStatusForm> = {
  confirmedInitials: (value: boolean) =>
    !value && "Du må bekrefte at du har sjekket forbokstaver",
  correctEndings: (value: boolean) =>
    !value && "Du må bekrefte at alle endinger er korrekt",
  correctFunctions: (value: boolean) =>
    !value && "Du må bekrefte at alle funksjoner er skrevet inn korrekt",
  correctGrammar: (value: boolean) =>
    !value && "Du må bekrefte at grammatikken er korrekt",
  addedLogo: (value: boolean) =>
    !value && "Du må bekrefte at du har lagt til logo"
};
