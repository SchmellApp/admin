import { FormRulesRecord } from "@mantine/form/lib/types";
import { CreateTaskForm } from "@/types/forms/task";
import { TaskCategory } from "@/enums/task";

export const createTaskValidationSchema: FormRulesRecord<CreateTaskForm> = {
  title: (value) => !(value.length > 0) && "Tittel er påkrevd",
  description: (value) => !(value.length > 0) && "Beskrivelse er påkrevd",
  category: (value: TaskCategory) =>
    value === undefined && "Kategori er påkrevd",
  responsible: (value) => !(value.length > 0) && "Ansvarlig er påkrevd"
};
