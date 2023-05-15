import { DataTableHeader } from "@app/types";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Button, Pagination, Table, Title, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { useTheme } from "@app/hooks";

interface DataTableProps {
  headers: DataTableHeader[];
  sort?: string;
  setSort?: Dispatch<SetStateAction<string>>;
  currentPage: number;
  maxPage?: number;
  onChangePage: (page: number) => void;
  title?: string;
  children: ReactNode;
}

const DataTableWrapper = ({
  title,
  headers,
  setSort,
  sort,
  currentPage,
  maxPage = 10,
  onChangePage,
  children
}: DataTableProps): JSX.Element => {
  const { isDark } = useTheme();

  const getSortIcon = (header: DataTableHeader): ReactNode | undefined => {
    if (header.isSortable && header.sortKeys != null) {
      if (sort === header.sortKeys.ASC) {
        return <IconChevronUp size={16} />;
      } else if (sort === header.sortKeys.DESC) {
        return <IconChevronDown size={16} />;
      }
    }
  };
  const handleClick = (header: DataTableHeader): void => {
    if (header.isSortable && header.sortKeys != null && setSort != null) {
      if (sort === header.sortKeys.ASC) {
        setSort(header.sortKeys.DESC);
      } else if (sort === header.sortKeys.DESC) {
        setSort("");
      } else {
        setSort(header.sortKeys.ASC);
      }
    }
  };

  return (
    <div>
      <Title order={3} mb="sm">
        {title}
      </Title>
      <Table verticalSpacing="lg" highlightOnHover horizontalSpacing="md">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.name}>
                {header.isSortable ? (
                  <Tooltip label="Sorter">
                    <Button
                      variant="subtle"
                      color="dark"
                      onClick={() => handleClick(header)}
                      rightIcon={getSortIcon(header)}
                    >
                      {header.name}
                    </Button>
                  </Tooltip>
                ) : (
                  header.name
                )}
              </th>
            ))}
          </tr>
        </thead>
        {children}
      </Table>
      <Pagination
        total={maxPage}
        color={isDark ? "yellow" : "dark"}
        mt="md"
        position="right"
        value={currentPage}
        onChange={(page) => onChangePage(page)}
      />
    </div>
  );
};

export default DataTableWrapper;
