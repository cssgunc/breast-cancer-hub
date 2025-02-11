import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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

export type PeriodTimestamp = {
  date: number;
  month: number;
  year: number;
};

const periodTimetampsKey = "periodTimestamps";

let PERIODS_FETCHED = false;

export async function initPeriods(): Promise<boolean> {
  if (PERIODS_FETCHED) return false;
  let res;
  if (Platform.OS === "web") {
    res = await AsyncStorage.getItem(periodTimetampsKey);
  } else {
    res = await SecureStore.getItemAsync(periodTimetampsKey);
  }
  if (res) {
    GLOBAL_PERIOD_DATA = JSON.parse(res);
    return true;
  }
  GLOBAL_PERIOD_DATA = [];
  PERIODS_FETCHED = true;
  return false;
}

export function addPeriod(p: Date) {
  const newPeriod = {
    date: p.getUTCDate(),
    month: p.getUTCMonth(),
    year: p.getUTCFullYear(),
  };

  for (const p of GLOBAL_PERIOD_DATA) {
    if (
      p.date == newPeriod.date &&
      p.month == newPeriod.month &&
      p.year == newPeriod.year
    ) {
      return GLOBAL_PERIOD_DATA;
    }
  }
  GLOBAL_PERIOD_DATA.push(newPeriod);

  GLOBAL_PERIOD_DATA.sort(
    (a, b) =>
      new Date(a.year, a.month, a.date).getTime() -
      new Date(b.year, b.month, b.date).getTime()
  );
  savePeriods();
}

export function removePeriod(p: Date) {
  //filter is not inplace
  const newPeriod = {
    date: p.getUTCDate(),
    month: p.getUTCMonth(),
    year: p.getUTCFullYear(),
  };
  GLOBAL_PERIOD_DATA = GLOBAL_PERIOD_DATA.filter(
    (p) =>
      p.date != newPeriod.date ||
      p.month != newPeriod.month ||
      p.year != newPeriod.year
  );
  savePeriods();
}

export async function savePeriods() {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(
      periodTimetampsKey,
      JSON.stringify(GLOBAL_PERIOD_DATA)
    );
  } else {
    await SecureStore.setItemAsync(
      periodTimetampsKey,
      JSON.stringify(GLOBAL_PERIOD_DATA)
    );
  }
}

export function isPeriodDay(value: Date) {
  return GLOBAL_PERIOD_DATA.some(
    (p) =>
      p.date == value.getUTCDate() &&
      p.month == value.getUTCMonth() &&
      p.year == value.getUTCFullYear()
  );
}

export function isCheckupDay(value: Date) {
  if (GLOBAL_PERIOD_DATA.length == 0) return false;
  const ts = GLOBAL_PERIOD_DATA[GLOBAL_PERIOD_DATA.length - 1];
  const p = new Date(ts.year, ts.month, ts.date + 7);
  return (
    p.getUTCDate() == value.getUTCDate() &&
    p.getUTCMonth() == value.getUTCMonth() &&
    p.getUTCFullYear() == value.getUTCFullYear()
  );
}

export function getCheckupDay(): PeriodTimestamp | undefined {
  if (GLOBAL_PERIOD_DATA.length == 0) return undefined;
  return GLOBAL_PERIOD_DATA[GLOBAL_PERIOD_DATA.length - 1];
}

export let GLOBAL_PERIOD_DATA: PeriodTimestamp[] = [];
