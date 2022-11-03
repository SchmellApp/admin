import { Game } from "../../../types/game";

export const games: Game[] = [
  {
    id: 1,
    name: "Start Vorset",
    description: "Start Vorset er et spill som handler om å starte Vorset",
    lastUpdated: new Date("2022-10-15T12:00:00.000Z"),
    logo: "games/startvorset.png"
  },
  {
    id: 2,
    name: "Gjengen",
    description: "Gjengen er et spill som handler om å være en del av en gjeng",
    lastUpdated: new Date("2022-10-01T12:00:00.000Z"),
    logo: "games/gjengen.png"
  },
  {
    id: 3,
    name: "Date night",
    description: "Date night er et spill som handler om å ha en date",
    lastUpdated: new Date("2022-10-12T12:00:00.000Z"),
    logo: "games/datenight.png"
  },
  {
    id: 4,
    name: "Mamma, beklager",
    description: "Mamma, beklager er et spill som handler om å beklage",
    lastUpdated: new Date("2022-10-28T12:00:00.000Z"),
    logo: "games/mammabeklager.png"
  },
  {
    id: 5,
    name: "Haloween",
    description: "Haloween er et spill som handler om å være en spøkelse",
    lastUpdated: new Date("2022-11-01T12:00:00.000Z"),
    logo: "games/haloween.png"
  }
];
