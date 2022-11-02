import React from "react";
import { useForm } from "@mantine/form";
import { Textarea, ActionIcon, Box } from "@mantine/core";
import { IconSend } from "@tabler/icons";

const CommentForm = (): JSX.Element => {
  const form = useForm({
    initialValues: { comment: "" },
    validate: {
      comment: (value) => !(value.length > 0) && "Du må skrive en kommentar"
    }
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
