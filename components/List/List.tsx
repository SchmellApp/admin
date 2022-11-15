import React, { FC } from "react";
import { Paper, Stack } from "@mantine/core";
import { AvatarCard, TextCard } from "../Cards";
import { ListElement } from "@app/types/ui/list";

interface ListElementsProps {
  title: string;
  color: string;
  elements: ListElement[];
  handleClick?: (id: number) => void;
  isLoading?: boolean;
}
const ListElements: FC<ListElementsProps> = ({
  elements,
  color,
  title,
  handleClick,
  isLoading
}): JSX.Element => {
  return (
    <Paper
      shadow="md"
      radius="sm"
      p="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[1]
      })}
    >
      <TextCard title={title} color={color} />
      <Stack spacing="md" mt="md">
        {elements.map((element, idx) => (
          <AvatarCard
            text={element.text}
            color={color}
            avatarUrl={element.avatarUrl}
            key={idx}
            id={element.id}
            handleClick={handleClick}
            isLoading={isLoading}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default ListElements;
