import { CardProps, ActionElement } from "@app/types";
import React, { useRef } from "react";
import {
  Card,
  Title,
  Text,
  UnstyledButton,
  Group,
  Divider,
  Skeleton
} from "@mantine/core";
import Link from "next/link";

interface ActionCardProps extends CardProps {
  actionElements: ActionElement[];
}

const ActionCard = ({
  title,
  description,
  actionElements,
  isLoading
}: ActionCardProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Card p="md" shadow="sm" radius="md">
      <Title order={2}>{title}</Title>
      <Text color="dimmed">{description}</Text>
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        {actionElements.map((actionElement, index) => (
          <Link href={actionElement.href} key={index} passHref>
            {isLoading === true ? (
              <Skeleton
                height={buttonRef?.current?.clientHeight ?? 40}
                m="sm"
              />
            ) : (
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
                ref={buttonRef}
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
            )}
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default ActionCard;
