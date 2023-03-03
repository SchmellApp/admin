import React from "react";
import {
  IconHome,
  IconListCheck,
  IconBulb,
  IconDeviceGamepad2,
  IconMail
} from "@tabler/icons";

export const nav = [
  {
    label: "Oversikt",
    href: "/",
    icon: <IconHome size={20} />
  },
  {
    label: "Oppgaver",
    href: "/tasks",
    icon: <IconListCheck size={20} />
  },
  {
    label: "Ideer",
    href: "/ideas",
    icon: <IconBulb size={20} />
  },
  {
    label: "Spill",
    href: "/games",
    icon: <IconDeviceGamepad2 size={20} />
  },
  {
    label: "Kundekontakt",
    href: "/contact",
    icon: <IconMail size={20} />
  }
  /*
  {
    label: "Statistikk",
    href: "/stats",
    icon: <IconChartAreaLine size={20} />
  } */
];
