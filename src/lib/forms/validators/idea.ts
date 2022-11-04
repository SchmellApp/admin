import { FormRulesRecord } from "@mantine/form/lib/types";
import { IdeaForm } from "@/types/forms/idea";
import { IdeaCategory } from "@/enums/idea";

export const createIdeaFormValidationSchema: FormRulesRecord<IdeaForm> = {
  category: (value: IdeaCategory) =>
    value === undefined && "Må velge en kategori",
  ideaText: (value) => !(value.length > 0) && "Må skrive en idé😜"
};
