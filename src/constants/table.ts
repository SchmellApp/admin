import packageJson from "../../package.json";

export const DAY_STATISTICS_HEADER = [
  "Spill",
  "Antall Spørsmål",
  "Brukere (uke)",
  "Inntekt (måned)"
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
