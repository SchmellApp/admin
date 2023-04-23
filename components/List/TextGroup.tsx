import { Box, Text } from "@mantine/core";
import React from "react";

interface TextGroupProps {
  title: string;
  text: string;
}

const TextGroup = ({ title, text }: TextGroupProps): JSX.Element => (
  <Box
    my="xs"
    sx={{
      display: "flex",
      justifyContent: "space-between"
    }}
  >
    <Text size="sm" weight={500}>
      {title}
    </Text>
    <Text size="sm" align="right" ml="sm">
      {text}
    </Text>
  </Box>
);
export default TextGroup;
