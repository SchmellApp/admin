import React, { FC } from "react";
import {
  useMantineTheme,
  Box,
  UnstyledButton,
  Group,
  Avatar,
  Text
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";

interface UserProps {
  userFullName: string;
  userAvatarUrl: string;
  userEmailAddress: string;
}

const User: FC<UserProps> = ({
  userAvatarUrl,
  userEmailAddress,
  userFullName
}) => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`
      }}
    >
      <Link href={"/settings"} passHref>
        <UnstyledButton
          sx={{
            display: "block",
            width: "100%",
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
          }}
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
            <IconChevronRight size={18} />
          </Group>
        </UnstyledButton>
      </Link>
    </Box>
  );
};

export default User;
