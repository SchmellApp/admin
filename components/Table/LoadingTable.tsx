import React from "react";
import { Skeleton } from "@mantine/core";

interface LoadingTableProps {
  rows?: number;
  columns?: number;
}

const LoadingTable = ({
  rows = 5,
  columns = 5
}: LoadingTableProps): JSX.Element => (
  <>
    {Array.from(Array(rows).keys()).map((row) => (
      <tr key={row}>
        {Array.from(Array(columns).keys()).map((column) => (
          <td key={column}>
            <Skeleton height={50} />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export default LoadingTable;
