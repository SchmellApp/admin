import React from "react";
import { Card, Text, Avatar, ActionIcon, Skeleton } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { useTheme } from "@app/hooks";

interface AvatarCardProps {
  text: string;
  color: string;
  id: number;
  avatarUrl?: string;
  handleClick?: (id: number) => void;
  isLoading?: boolean;
}

const AvatarCard = ({
  text,
  avatarUrl,
  color,
  handleClick,
  id,
  isLoading
}: AvatarCardProps): JSX.Element => {
  const { theme } = useTheme();
  return (
    <>
      {isLoading === true ? (
        <Skeleton height={100} />
      ) : (
        <Card
          shadow="sm"
          radius="md"
          sx={(theme) => ({
            backgroundColor: color,
            color: "black",
            position: "relative",
            minHeight: 100
          })}
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
      )}
    </>
  );
};

export default AvatarCard;
