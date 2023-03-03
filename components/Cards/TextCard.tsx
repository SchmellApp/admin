import React, { useRef } from "react";
import { Card, Skeleton, Text, Title } from "@mantine/core";
import { CardProps } from "@app/types";

const TextCard = ({
  title,
  description,
  color,
  isLoading
}: CardProps): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {isLoading === true ? (
        <Skeleton height={cardRef?.current?.clientHeight ?? 100} />
      ) : (
        <Card
          shadow="sm"
          p="md"
          radius="md"
          sx={{ justifyContent: "center", backgroundColor: color }}
          ref={cardRef}
        >
          <Text align="center" size="xl">
            {description}
          </Text>
          <Title
            order={2}
            align="center"
            sx={{ color: color != null ? "black" : undefined }}
          >
            {title}
          </Title>
        </Card>
      )}
    </>
  );
};

export default TextCard;
