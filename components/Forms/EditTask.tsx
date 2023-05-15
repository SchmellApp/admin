import { EditTaskForm, Task } from "@app/types";
import React from "react";
import { useForm } from "@mantine/form";
import { Group, Select } from "@mantine/core";
import { TASK_STATUS } from "@app/constants";
import { DateInput } from "@mantine/dates";
import { TaskCategory, TaskStatus } from "@app/enums";
import { toOptions } from "@app/utils";
import { editTaskInitialValues } from "@app/lib";
import { useGamesQuery, useUpdateTaskMutation } from "@app/hooks";
import { SubmitButton } from "@app/components";
import { useAppState } from "@app/hooks/state";

interface EditTaskProps {
  task: Task;
}

const EditTask = ({ task }: EditTaskProps): JSX.Element => {
  const { mutateAsync, isLoading } = useUpdateTaskMutation(String(task.id));
  const { data: games } = useGamesQuery();
  const { incrementSolvedTasks } = useAppState();

  const form = useForm<EditTaskForm>({
    initialValues: editTaskInitialValues(task)
  });

  const isTaskCategoryGame = task.category === TaskCategory.GAMES;

  const handleSubmit = async (values: EditTaskForm): Promise<void> => {
    if (values.status === TaskStatus.DONE) incrementSolvedTasks();

    await mutateAsync({
      ...values,
      relatedGame: Number(values.relatedGame)
    });
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        void handleSubmit(values);
      })}
    >
      {form.isDirty() && (
        <Group position="right" mt="md">
          <SubmitButton label="Oppdater" isLoading={isLoading} />
        </Group>
      )}
      <Select
        data={TASK_STATUS}
        label="Status"
        size="md"
        mt="sm"
        {...form.getInputProps("status")}
      />
      <DateInput
        label="Frist"
        size="md"
        mt="sm"
        popoverProps={{ offset: -100 }}
        minDate={new Date()}
        {...form.getInputProps("deadline")}
      />
      {isTaskCategoryGame && games !== undefined && (
        <Select
          data={toOptions(games)}
          label="Relatert spill"
          size="md"
          mt="sm"
          {...form.getInputProps("relatedGame")}
        />
      )}
    </form>
  );
};

export default EditTask;
