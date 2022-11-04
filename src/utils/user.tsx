import React from "react";
import { User } from "@/types/user";
import { users } from "@/lib/demo/users/user";
import { SegmentedControlItem, Avatar } from "@mantine/core";

export const getUser = (id: User["id"]): User | undefined =>
  users.find((user) => user.id === id);

export const getFullName = (user: User): string =>
  `${user.firstName} ${user.lastName}`;

export const toUserControls = (users: User[]): SegmentedControlItem[] =>
  users.map((user) => ({
    value: String(user.id),
    label: <Avatar src={user.profilePictureUrl} alt={user.username} />
  }));
