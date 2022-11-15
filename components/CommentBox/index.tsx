import React, { FC } from "react";
import { Comment as CommentType } from "@app/types";
import { Box, Group, Text, Avatar } from "@mantine/core";
import { toDateTimeString } from "@app/utils";

interface CommentProps {
  comment: CommentType;
}

const CommentBox: FC<CommentProps> = ({ comment }): JSX.Element => (
  <Box>
    <Text size="xs" color="dimmed">
      {toDateTimeString(new Date(comment.createdDate))}
    </Text>
    <Group
      position="apart"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[4],
        borderRadius: theme.spacing.md
      })}
      p="xs"
    >
      <Avatar src={comment.writtenBy.profilePictureUrl} size="sm" />
      <Text size="sm">{comment.comment}</Text>
    </Group>
  </Box>
);

export default CommentBox;
