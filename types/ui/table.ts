export interface DataTableHeader {
  name: string;
  isSortable: boolean;
  sortKeys?: {
    ASC: string;
    DESC: string;
  };
}
