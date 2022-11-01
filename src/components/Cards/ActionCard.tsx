import { CardProps } from "../../types/card";
import { ActionElement } from "../../types/ui/statistics";
import React, { FC } from "react";
import {
  Card,
  Title,
  Text,
  UnstyledButton,
  Group,
  Divider
} from "@mantine/core";
import Link from "next/link";

interface ActionCardProps extends CardProps {
  actionElements: ActionElement[];
}

const ActionCard: FC<ActionCardProps> = ({
  title,
  description,
  actionElements
}): JSX.Element => (
  <Card p="md" shadow="sm" radius="md">
    <Title order={2}>{title}</Title>
    <Text color="dimmed">{description}</Text>
    <div style={{ marginTop: 8, marginBottom: 8 }}>
      {actionElements.map((actionElement, index) => (
        <Link href={actionElement.href} key={index} passHref>
          <UnstyledButton
            p={"xs"}
            pt={undefined}
            sx={(theme) => ({
              width: "100%",
              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[0]
              },
              borderRadius: theme.spacing.xs
            })}
          >
            <Group position="apart" mt="md">
              <Text weight="bolder" size={"sm"}>
                {actionElement.name}
              </Text>
              {typeof actionElement.right === "string" ? (
                <Text>{actionElement.right}</Text>
              ) : (
                actionElement.right
              )}
            </Group>
            <Divider
              mt="sm"
              sx={(theme) => ({
                borderColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[4]
              })}
            />
          </UnstyledButton>
        </Link>
      ))}
    </div>
  </Card>
);

export default ActionCard;
