import React, { FC } from "react";
import {
  Grid,
  Paper,
  Title,
  Text,
  Table,
  SimpleGrid,
  useMantineTheme,
  Divider
} from "@mantine/core";
import { DayStatisticsRows } from "../../types/ui/statistics";
import { CardProps } from "../../types/card";

interface TableCardProps extends CardProps {
  headers: string[];
  rows: DayStatisticsRows[];
  rightCards?: Array<{
    title: string;
    description: string | number;
  }>;
}

const TableCard: FC<TableCardProps> = ({
  title,
  description,
  headers,
  rows,
  rightCards
}): JSX.Element => {
  const theme = useMantineTheme();

  const isDarkMode = theme.colorScheme === "dark";

  return (
    <Paper
      shadow="sm"
      radius="md"
      mt="xl"
      sx={{
        backgroundColor: isDarkMode ? theme.colors.dark[6] : theme.white
      }}
    >
      <Grid grow>
        <Grid.Col
          span={9}
          p="lg"
          sx={{
            borderRight: `0.5px solid ${
              isDarkMode ? theme.colors.dark[4] : theme.colors.gray[2]
            }`
          }}
        >
          <Title order={2}>{title}</Title>
          <Text color="dimmed">{description}</Text>
          <Table verticalSpacing={"sm"} mt={"lg"} horizontalSpacing={"md"}>
            <thead>
              <tr>
                {headers.map((header, index, array) => (
                  <th
                    key={index}
                    style={{
                      paddingBottom: 12,
                      paddingLeft: index === 0 ? 16 : undefined,
                      textAlign: index === 0 ? "left" : "right"
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.gameName}</td>
                  <td style={{ textAlign: "right" }}>{row.count}</td>
                  <td style={{ textAlign: "right" }}>{row.userCount}</td>
                  <td style={{ textAlign: "right" }}>{row.income}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Grid.Col>
        {rightCards != null && (
          <Grid.Col span={3}>
            <SimpleGrid
              cols={1}
              breakpoints={[
                {
                  maxWidth: 600,
                  cols: 2
                }
              ]}
            >
              {rightCards.map((card, index, array) => (
                <div key={index}>
                  <div
                    style={{
                      padding: 8,
                      textAlign: "center"
                    }}
                  >
                    <Text size="lg">{card.description}</Text>
                    <Title order={4}>{card.title}</Title>
                  </div>
                  {index < array.length - 1 && <Divider />}
                </div>
              ))}
            </SimpleGrid>
          </Grid.Col>
        )}
      </Grid>
    </Paper>
  );
};

export default TableCard;
