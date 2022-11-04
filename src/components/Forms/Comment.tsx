import React from "react";
import { useForm } from "@mantine/form";
import { Textarea, ActionIcon, Box } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { CreateCommentForm } from "@/types/forms/comment";
import { createCommentFormInitialValues } from "@/lib/forms/initialValues/comment";
import { users } from "@/lib/demo/users/user";
import { createCommentFormValidationSchema } from "@/lib/forms/validators/comment";

const CommentForm = (): JSX.Element => {
  const form = useForm<CreateCommentForm>({
    initialValues: createCommentFormInitialValues(users[1], 1),
    validate: createCommentFormValidationSchema
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => console.log(values))}
      my="md"
      sx={{ display: "flex" }}
    >
      <Textarea
        placeholder="Skriv inn kommentar"
        sx={{
          flex: 1
        }}
        {...form.getInputProps("comment")}
      />
      <ActionIcon type="submit" variant="outline" size={64}>
        <IconSend size={20} />
      </ActionIcon>
    </Box>
  );
};

export default CommentForm;
