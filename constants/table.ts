import packageJson from "../package.json";
import { DataTableHeader } from "@app/types";

export const DAY_STATISTICS_HEADER = [
  "Spill",
  "Antall Spørsmål",
  "Brukere (uke)"
];

export const DAY_STATISTICS_CARDS = [
  { title: "Løste oppgaver", description: 0 },
  {
    title: "Antall brukere",
    description: 20
  },
  {
    title: "Antall spill spilt",
    description: 12
  },
  {
    title: "Inntekt",
    description: "100kr"
  },
  {
    title: "Versjon",
    description: packageJson.version
  }
];

export const TASKS_HEADER: DataTableHeader[] = [
  {
    name: "Oppgave detaljer",
    isSortable: false
  },
  {
    name: "Kategori",
    isSortable: true,
    sortKeys: {
      ASC: "CATEGORY_ASC",
      DESC: "CATEGORY_DESC"
    }
  },
  {
    name: "Frist",
    isSortable: true,
    sortKeys: {
      ASC: "DEADLINE_ASC",
      DESC: "DEADLINE_DESC"
    }
  },
  {
    name: "Prioritet",
    isSortable: true,
    sortKeys: {
      ASC: "PRIORITY_ASC",
      DESC: "PRIORITY_DESC"
    }
  }
];

export const CONTACT_FORM_HEADER: DataTableHeader[] = [
  {
    name: "Type",
    isSortable: false
  },
  {
    name: "Akseptert vilkår",
    isSortable: false
  },
  {
    name: "E-post",
    isSortable: false
  }
];
