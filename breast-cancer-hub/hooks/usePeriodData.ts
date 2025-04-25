import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getSetting } from "./useSettings";

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

export async function initPeriods(): Promise<boolean> {
  let res;
  let userId = await getSetting("userId");
  if (Platform.OS === "web") {
    res = await AsyncStorage.getItem(`${userId}_periodTimestampsKey`);
  } else {
    res = await SecureStore.getItemAsync(`${userId}_periodTimestampsKey`);
  }
  if (res) {
    GLOBAL_PERIOD_DATA = JSON.parse(res);
    return true;
  }
  GLOBAL_PERIOD_DATA = [];
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
  let userId = await getSetting("userId");
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(
      `${userId}_periodTimestampsKey`,
      JSON.stringify(GLOBAL_PERIOD_DATA)
    );
  } else {
    await SecureStore.setItemAsync(
      `${userId}_periodTimestampsKey`,
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

let GLOBAL_PERIOD_DATA: PeriodTimestamp[] = [];
