export const parseDateToUnderstandable = (date: Date): string =>
  date.toLocaleString("no-NO", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

export const parseDateToHour = (date: Date): string =>
  date.toLocaleString("no-NO", {
    hour: "2-digit",
    minute: "2-digit"
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
