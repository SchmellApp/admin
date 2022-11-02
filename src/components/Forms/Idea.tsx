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
import { IDEA_CATEGORIES } from "../../constants/idea";
import { IconBulb } from "@tabler/icons";

const CreateIdea = (): JSX.Element => {
  const form = useForm({
    initialValues: {
      category: "",
      ideaText: ""
    },
    validate: {
      category: (value) => !(value.length > 0) && "Må velge en kategori",
      ideaText: (value) => !(value.length > 0) && "Må skrive en idé😜"
    }
  });
  const isDarkMode = useMantineColorScheme().colorScheme === "dark";

  return (
    <Group mt="md" position="right">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
