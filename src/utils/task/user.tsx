import { User } from "../../types/user";
import { Avatar, SegmentedControlItem } from "@mantine/core";
import React from "react";

export const parseUserToFilter = (users: User[]): SegmentedControlItem[] =>
  users.map((user) => ({
    value: String(user.id),
    label: <Avatar src={user.profilePictureUrl} alt={user.username} />
  }));
