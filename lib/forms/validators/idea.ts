import { FormRulesRecord } from "@mantine/form/lib/types";
import { IdeaForm } from "@app/types";
import { IdeaCategory } from "@app/enums";

export const createIdeaFormValidationSchema: FormRulesRecord<IdeaForm> = {
  category: (value: IdeaCategory) =>
    value === undefined && "Må velge en kategori",
  ideaText: (value: string) => !(value.length > 0) && "Må skrive en idé😜"
};
