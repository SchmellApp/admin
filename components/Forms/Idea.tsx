import React from "react";
import { useForm } from "@mantine/form";
import {
  Group,
  Select,
  Textarea,
  Button,
  useMantineColorScheme,
  Stack
} from "@mantine/core";
import { IDEA_CATEGORIES } from "@app/constants";
import { IconBulb } from "@tabler/icons";
import { IdeaForm } from "@app/types";
import {
  createIdeaFormInitialValues,
  createIdeaFormValidationSchema
} from "@app/lib";
import { useIdeaMutation } from "@app/hooks";
import useSelfQuery from "@app/hooks/auth/useSelfQuery";

const CreateIdea = (): JSX.Element => {
  const mutation = useIdeaMutation();
  const { data: activeUser } = useSelfQuery();

  const form = useForm<IdeaForm>({
    initialValues: createIdeaFormInitialValues(activeUser?.id ?? 0),
    validate: createIdeaFormValidationSchema
  });
  const isDarkMode = useMantineColorScheme().colorScheme === "dark";
  const onSubmit = (values: IdeaForm): void => {
    mutation.mutate(values);
    form.reset();
  };

  return (
    <Group mt="md" position="right">
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Stack spacing="sm">
          <Select
            withAsterisk
            data={IDEA_CATEGORIES}
            placeholder="Velg kategori"
            {...form.getInputProps("category")}
          />
          <Textarea
            withAsterisk
            placeholder="Skriv inn idé.."
            {...form.getInputProps("ideaText")}
          />
          <Group position="right">
            <Button
              type="submit"
              variant="light"
              color={isDarkMode ? "yellow" : "dark"}
              radius="md"
              size="md"
              rightIcon={<IconBulb />}
              loading={mutation.isLoading}
            >
              Post
            </Button>
          </Group>
        </Stack>
      </form>
    </Group>
  );
};

export default CreateIdea;
