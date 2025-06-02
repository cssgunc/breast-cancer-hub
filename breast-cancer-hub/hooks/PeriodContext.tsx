import {
  CancelPeriodReminderNotifications,
  SchedulePeriodReminderNotifications,
} from "@/notifications/notifications";
import { getSetting, saveSetting } from "./useSettings";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type PeriodTimestamp = {
  date: number;
  month: number;
  year: number;
};

export type Cycle = {
  start: PeriodTimestamp;
  length: number;
};

interface PeriodContextValue {
  timestamps: PeriodTimestamp[];
  cycles: Cycle[];
  addPeriod: (d: Date) => Promise<PeriodTimestamp[]>;
  removePeriod: (d: Date) => Promise<PeriodTimestamp[]>;
  rescheduleNotifications: () => Promise<void>;
}
const PeriodContext = createContext<PeriodContextValue | null>(null);

// Calculate cycles from global data and return array of cycle objects
function extractCycles(timestamps: PeriodTimestamp[]): Cycle[] {
  if (!timestamps.length) return [];
  timestamps.sort((a, b) => +a - +b);
  const cycles: Cycle[] = [];
  let cluster: PeriodTimestamp[] = [timestamps[0]];

  for (let i = 1; i < timestamps.length; i++) {
    const prev = timestamps[i - 1];
    const curr = timestamps[i];

    const prevDate = new Date(prev.year, prev.month, prev.date);
    const currDate = new Date(curr.year, curr.month, curr.date);

    const dayDiff =
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
    if (dayDiff === 1) {
      cluster.push(curr);
    } else {
      cycles.push({ start: cluster[0], length: cluster.length });
      cluster = [curr];
    }
  }
  cycles.push({ start: cluster[0], length: cluster.length });
  return cycles;
}

export const PeriodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timestamps, setTimestamps] = useState<PeriodTimestamp[]>([]);
  const cycles = useMemo(() => extractCycles(timestamps), [timestamps]);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    (async () => {
      await setUserId(await getSetting("userId"));
      setTimestamps(await getSetting("periodTimestamps"));
    })();
  }, []);

  const addPeriod = async (date: Date) => {
    const newTimestamp: PeriodTimestamp = {
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    let newArray: PeriodTimestamp[] = [];
    await setTimestamps((prev) => {
      const next = [...prev, newTimestamp].sort((a, b) => {
        const ta = new Date(a.year, a.month, a.date).getTime();
        const tb = new Date(b.year, b.month, b.date).getTime();
        return ta - tb;
      });
      saveSetting("periodTimestamps", next);
      newArray = next;
      return next;
    });

    if (newArray.length > 0) {
      const last = newArray[newArray.length - 1];
      const lastDate = new Date(last.year, last.month - 1, last.date);
      await SchedulePeriodReminderNotifications(lastDate);
    }
    return newArray;
  };

  const removePeriod = async (date: Date) => {
    const removeTimestamp: PeriodTimestamp = {
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    let newArray: PeriodTimestamp[] = [];
    await setTimestamps((prev) => {
      const next = prev.filter(
        (p) =>
          !(
            p.date === removeTimestamp.date &&
            p.month === removeTimestamp.month &&
            p.year === removeTimestamp.year
          )
      );
      saveSetting("periodTimestamps", next);
      newArray = next;
      return next;
    });
    if (newArray.length > 0) {
      const last = newArray[newArray.length - 1];
      const lastDate = new Date(last.year, last.month - 1, last.date);
      await SchedulePeriodReminderNotifications(lastDate);
    }
    return newArray;
  };

  const rescheduleNotifications = async () => {
    const menstruates = await getSetting("schedulingType");
    if (timestamps.length > 0 && menstruates === "period") {
      const last = timestamps[timestamps.length - 1];
      const lastDate = new Date(last.year, last.month - 1, last.date);
      await SchedulePeriodReminderNotifications(lastDate);
    } else await SchedulePeriodReminderNotifications(); // Empty arg = cancelling only with logging
  };

  return (
    <PeriodContext.Provider
      value={{
        timestamps,
        cycles,
        addPeriod,
        removePeriod,
        rescheduleNotifications,
      }}
    >
      {children}
    </PeriodContext.Provider>
  );
};

export const OrderedMonthNames: MonthName[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export const OrderedWeekdayNames = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const OrderedShortenedMonthNames = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export function usePeriodData() {
  const ctx = useContext(PeriodContext);
  if (!ctx) throw new Error("usePeriodData must be inside PeriodProvider");
  return ctx;
}
