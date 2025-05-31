export function parseHHMMString(time: string): {
  hours: number;
  minutes: number;
} {
  const [timePart, modifier] = time.trim().split(" ");
  let [hours, minutes] = timePart.split(":").map((n) => parseInt(n, 10));

  const mod = modifier.toUpperCase();
  if (mod === "PM" && hours < 12) {
    hours += 12;
  } else if (mod === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

/**
 *
 * @param s String in ISO format (YYYY-MM-DDTHH:MM:SS.MMMZ)
 * @returns Date with year, month, and day, with h/m/s truncated.
 */
export function parseISODate(s: string): Date {
  const [year, month, day] = s.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export const parseISODateToLocaleString = (iso: string, locale: string) => {
  const date = parseISODate(iso);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 *
 * @param a Date to compare
 * @param b Date to compare
 * @returns True iff year, month, and day are equal
 */
export function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatHMTime(hour: number, minute: number, locale = "en-US") {
  const d = new Date(1970, 0, 1, hour, minute);
  return d.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
