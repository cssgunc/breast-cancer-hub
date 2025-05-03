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

export function parseISODate(s: string): Date {
  const [year, month, day] = s.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
