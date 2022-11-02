import React, { FC } from "react";
import { Card, Text, Avatar, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
interface AvatarCardProps {
  text: string;
  color: string;
  id: number;
  avatarUrl?: string;
  handleClick?: (id: number) => void;
}

const AvatarCard: FC<AvatarCardProps> = ({
  text,
  avatarUrl,
  color,
  handleClick,
  id
}): JSX.Element => {
  const theme = useMantineTheme();
  return (
    <Card
      shadow="sm"
      radius="md"
      sx={{
        backgroundColor: color,
        color: "black",
        position: "relative",
        minHeight: 100
      }}
      mx="md"
    >
      {handleClick != null && (
        <ActionIcon
          onClick={() => handleClick(id)}
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            color: theme.colors.dark[7]
          }}
        >
          <IconTrash />
        </ActionIcon>
      )}
      <Text>{text}</Text>
      <Avatar
        src={avatarUrl}
        size="sm"
        sx={{ position: "absolute", bottom: 5, right: 5 }}
      />
    </Card>
  );
};

export default AvatarCard;
