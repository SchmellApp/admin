import React from "react";
import {
  Grid,
  Paper,
  Title,
  Text,
  Table,
  SimpleGrid,
  Divider,
  Skeleton
} from "@mantine/core";
import { DayStatisticsRows, CardProps } from "@app/types";
import { useTheme } from "@app/hooks";

interface TableCardProps extends CardProps {
  headers: string[];
  rows: DayStatisticsRows[];
  rightCards?: Array<{
    title: string;
    description: string | number;
  }>;
}

const TableCard = ({
  title,
  description,
  headers,
  rows,
  rightCards,
  isLoading
}: TableCardProps): JSX.Element => {
  const { isDark, theme } = useTheme();

  return (
    <Paper
      shadow="sm"
      radius="md"
      mt="xl"
      sx={{
        backgroundColor: isDark ? theme.colors.dark[6] : theme.white
      }}
    >
      <Grid grow>
        <Grid.Col
          span={9}
          p="lg"
          sx={{
            borderRight: `0.5px solid ${
              isDark ? theme.colors.dark[4] : theme.colors.gray[2]
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
              {rows.map((row, index) =>
                isLoading === true ? (
                  <tr>
                    <td colSpan={4}>
                      <Skeleton height={25} />
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td>{row.gameName}</td>
                    <td style={{ textAlign: "right" }}>{row.count}</td>
                    <td style={{ textAlign: "right" }}>{row.userCount}</td>
                  </tr>
                )
              )}
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
