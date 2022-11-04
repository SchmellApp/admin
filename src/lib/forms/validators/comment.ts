import { FormRulesRecord } from "@mantine/form/lib/types";
import { CreateCommentForm } from "@/types/forms/comment";

export const createCommentFormValidationSchema: FormRulesRecord<CreateCommentForm> =
  {
    comment: (value) => !(value.length > 0) && "Du må skrive en melding"
  };
