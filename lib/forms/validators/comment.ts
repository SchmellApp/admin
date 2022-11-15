import { FormRulesRecord } from "@mantine/form/lib/types";
import { CreateCommentForm } from "@app/types";

export const createCommentFormValidationSchema: FormRulesRecord<CreateCommentForm> =
  {
    comment: (value: string) => !(value.length > 0) && "Du må skrive en melding"
  };
