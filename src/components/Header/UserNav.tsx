import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { Box, UnstyledButton, Group, Avatar, Text } from "@mantine/core";

interface UserNavProps extends ComponentPropsWithoutRef<"button"> {
  userFullName: string;
  userAvatarUrl: string;
  userEmailAddress: string;
}

const UserNav = forwardRef<HTMLButtonElement, UserNavProps>(
  (
    { userAvatarUrl, userEmailAddress, userFullName, ...others }: UserNavProps,
    ref
  ) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
        }
      })}
      {...others}
    >
      <Group>
        <Avatar src={userAvatarUrl} radius="xl" />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {userFullName}
          </Text>
          <Text color="dimmed" size="xs">
            {userEmailAddress}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  )
);

UserNav.displayName = "UserNav";
export default UserNav;
