import { Task, EditTaskForm } from "@app/types";
import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Group, Select } from "@mantine/core";
import { TASK_STATUS } from "@app/constants";
import { DatePicker } from "@mantine/dates";
import { TaskCategory } from "@app/enums";
import { toOptions } from "@app/utils";
import { editTaskInitialValues } from "@app/lib";
import { useGamesQuery, useUpdateTaskMutation } from "@app/hooks";
import { SubmitButton } from "@app/components";

interface EditTaskProps {
  task: Task;
}

const EditTask = ({ task }: EditTaskProps): JSX.Element => {
  const updateTask = useUpdateTaskMutation(String(task.id));
  const { data: games } = useGamesQuery();

  useEffect(() => {
    console.log(task);
  }, [task]);

  const form = useForm<EditTaskForm>({
    initialValues: editTaskInitialValues(task)
  });

  const isTaskCategoryGame = task.category === TaskCategory.GAMES;

  const handleSubmit = async (values: EditTaskForm): Promise<void> => {
    await updateTask.mutateAsync({
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
          <SubmitButton label="Oppdater" isLoading={updateTask.isLoading} />
        </Group>
      )}
      <Select
        data={TASK_STATUS}
        label="Status"
        size="md"
        mt="sm"
        {...form.getInputProps("status")}
      />
      <DatePicker
        label="Frist"
        size="md"
        mt="sm"
        minDate={new Date()}
        dropdownType="modal"
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
