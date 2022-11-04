import { Task } from "@/types/task";
import React, { FC } from "react";
import { useForm } from "@mantine/form";
import { Select } from "@mantine/core";
import { TASK_STATUS } from "@/constants/task";
import { DatePicker } from "@mantine/dates";
import { TaskCategory } from "@/enums/task";
import { games } from "@/lib/demo/games/game";
import { toOptions } from "@/utils/common";

interface EditTaskProps {
  task: Task;
}

const EditTask: FC<EditTaskProps> = ({ task }) => {
  const form = useForm({
    initialValues: {
      status: task.status,
      deadline: task.deadline,
      relatedGame: String(task.relatedGame?.id) ?? "",
      priority: task.priority
    }
  });

  const isTaskCategoryGame = task.category === TaskCategory.GAMES;

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
      {isTaskCategoryGame && (
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
