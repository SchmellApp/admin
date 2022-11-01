import React, { FC } from "react";
import { Card, Text, Title } from "@mantine/core";
import { CardProps } from "../../types/card";

const TextCard: FC<CardProps> = ({ title, description }): JSX.Element => (
  <Card shadow="sm" p="md" radius="md" sx={{ justifyContent: "center" }}>
    <Text align="center" size="xl">
      {description}
    </Text>
    <Title order={2} align="center">
      {title}
    </Title>
  </Card>
);

export default TextCard;
