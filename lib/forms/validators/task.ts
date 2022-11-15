import { FormRulesRecord } from "@mantine/form/lib/types";
import { CreateTaskForm } from "@app/types";
import { TaskCategory, TaskPriority } from "@app/enums";

export const createTaskValidationSchema: FormRulesRecord<CreateTaskForm> = {
  title: (value) => !(value.length > 0) && "Tittel er påkrevd",
  description: (value) => !(value.length > 0) && "Beskrivelse er påkrevd",
  category: (value: TaskCategory) =>
    value === undefined && "Kategori er påkrevd",
  priority: (value: TaskPriority) =>
    value === undefined && "Prioritet er påkrevd"
};
