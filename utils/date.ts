export const toDateString = (date: Date): string =>
  date.toLocaleString("nb-NO", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

export const toDateTimeString = (date: Date): string =>
  date.toLocaleString("no-NO", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

export const getDifferenceInDays = (date: Date): string => {
  const now = new Date();
  const difference = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);

  const isHours = difference <= 1;
  const endString = isHours ? "timer" : difference < 1.5 ? "dag" : "dager";

  return `Oppdatert ${
    isHours ? Math.round(difference / (1000 * 3600)) : Math.round(difference)
  } ${endString} siden`;
};
