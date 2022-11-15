import React, { FC } from "react";
import { useForm } from "@mantine/form";
import { Textarea, ActionIcon, Box } from "@mantine/core";
import { IconSend } from "@tabler/icons";
import { CreateCommentForm, Task } from "@app/types";
import {
  createCommentFormInitialValues,
  createCommentFormValidationSchema
} from "@app/lib";
import { useCommentMutation } from "@app/hooks";
import useSelfQuery from "@app/hooks/auth/useSelfQuery";

interface CommentFormProps {
  currentTask: Task;
}

const CommentForm: FC<CommentFormProps> = ({ currentTask }): JSX.Element => {
  const createComment = useCommentMutation();
  const { data: activeUser } = useSelfQuery();
  const form = useForm<CreateCommentForm>({
    initialValues: createCommentFormInitialValues(
      activeUser?.id ?? 0,
      currentTask.id
    ),
    validate: createCommentFormValidationSchema
  });

  const handleSubmit = async (values: CreateCommentForm): Promise<void> => {
    await createComment.mutateAsync(form.values);
    form.reset();
  };

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => {
        void handleSubmit(values);
      })}
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
