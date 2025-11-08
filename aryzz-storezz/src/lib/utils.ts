type ClassValue = string | null | undefined | false;

export const cn = (...classes: ClassValue[]): string =>
  classes.filter(Boolean).join(" ");

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
