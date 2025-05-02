import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getSetting } from "./useSettings";
import { useEffect, useMemo, useState } from "react";

export type PeriodTimestamp = {
  date: number;
  month: number;
  year: number;
};

export type Cycle = {
  start: PeriodTimestamp;
  length: number;
};

let GLOBAL_PERIOD_DATA: PeriodTimestamp[] = [];

export function getCycles(): Cycle[] {
  return extractCycles(GLOBAL_PERIOD_DATA);
}

// Load period data from storage into global data
export async function initPeriods(): Promise<boolean> {
  let res;
  let userId = await getSetting("userId");
  if (Platform.OS === "web") {
    res = await AsyncStorage.getItem(`user_${userId}_periodTimestampsKey`);
  } else {
    res = await SecureStore.getItemAsync(`user_${userId}_periodTimestampsKey`);
  }
  if (res) {
    GLOBAL_PERIOD_DATA = JSON.parse(res);
    return true;
  }
  GLOBAL_PERIOD_DATA = [];
  return false;
}

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

export function usePeriodData() {
  const [timestamps, setTimestamps] = useState<PeriodTimestamp[]>([]);
  const cycles = useMemo(() => extractCycles(timestamps), [timestamps]);

  useEffect(() => {
    initPeriods().then((loaded) => {
      if (loaded) setTimestamps(GLOBAL_PERIOD_DATA);
    });
  }, []);

  const addPeriod = (date: Date) => {
    const newTimestamp: PeriodTimestamp = {
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    setTimestamps((ts) => {
      const exists = ts.some(
        (p) =>
          p.date === newTimestamp.date &&
          p.month === newTimestamp.month &&
          p.year === newTimestamp.year
      );
      const next = exists
        ? ts
        : [...ts, newTimestamp].sort((a, b) => {
            const ta = new Date(a.year, a.month, a.date).getTime();
            const tb = new Date(b.year, b.month, b.date).getTime();
            return ta - tb;
          });
      savePeriods(next);
      return next;
    });
  };

  const removePeriod = (date: Date) => {
    const removeTimestamp: PeriodTimestamp = {
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    setTimestamps((ts) => {
      const next = ts.filter(
        (p) =>
          !(
            p.date === removeTimestamp.date &&
            p.month === removeTimestamp.month &&
            p.year === removeTimestamp.year
          )
      );
      savePeriods(next);
      return next;
    });
  };

  return { timestamps, cycles, addPeriod, removePeriod };
}

export async function savePeriods(periods: PeriodTimestamp[]) {
  GLOBAL_PERIOD_DATA = periods;

  let userId = await getSetting("userId");
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(
      `user_${userId}_periodTimestampsKey`,
      JSON.stringify(periods)
    );
  } else {
    await SecureStore.setItemAsync(
      `user_${userId}_periodTimestampsKey`,
      JSON.stringify(periods)
    );
  }
}

export function isPeriodDay(value: Date) {
  return GLOBAL_PERIOD_DATA.some(
    (p) =>
      p.date == value.getUTCDate() &&
      p.month == value.getUTCMonth() + 1 &&
      p.year == value.getUTCFullYear()
  );
}

export function isCheckupDay(value: Date) {
  const y = value.getFullYear();
  const m = value.getMonth() + 1;
  const d = value.getDate();

  return getCycles().some(({ start, length }) => {
    const endDate = new Date(start.year, start.month, start.date + length - 1);

    const checkup = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() + 7
    );

    return (
      checkup.getFullYear() === y &&
      checkup.getMonth() === m &&
      checkup.getDate() === d
    );
  });
}

export function getCheckupDay(): PeriodTimestamp | undefined {
  if (GLOBAL_PERIOD_DATA.length == 0) return undefined;
  return GLOBAL_PERIOD_DATA[GLOBAL_PERIOD_DATA.length - 1];
}

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
