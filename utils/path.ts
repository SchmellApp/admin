export const toPageTitle = (path: string): string => {
  if (path === "/") {
    return "Oversikt";
  } else if (path.includes("tasks")) {
    return "Oppgaver";
  } else if (path.includes("ideas")) {
    return "Ideer";
  } else if (path.includes("games")) {
    return "Spill";
  } else if (path.includes("stats")) {
    return "Statistikk";
  } else if (path.includes("settings")) {
    return "Innstillinger";
  } else if (path.includes("contact")) {
    return "Kundekontakt";
  } else {
    return "Oops!";
  }
};
