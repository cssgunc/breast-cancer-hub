import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { Checkup } from "./CheckupContext";
import { PeriodTimestamp } from "./PeriodContext";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const CURRENT_SCHEMA = 1;

export type SettingsMap = {
  userId: string;
  token: string;

  schemaVersion: number; // Stores schema for migration purposes

  name: string;
  email: string;
  schedulingType: { day: number } | "period";

  notificationTimes: {
    id: number;
    time: Date;
    displayTime: string;
    enabled: boolean;
  }[]; //using expo-notifications trigger format

  locale: string; //using expo-localization

  useBackupData: boolean;
  useTelemetry: boolean;
  usePushNotifications: boolean;
  useInAppNotifications: boolean;
  useDarkTheme: boolean;
  avatar: boolean;

  onboarding: boolean;

  checkups: Checkup[];
  periodTimestamps: PeriodTimestamp[];
  nextExamDate: string;
};

export type SettingKeys = keyof SettingsMap;

export const GLOBAL_KEYS: SettingKeys[] = ["token", "userId"];

export const USER_SCOPED_KEYS: SettingKeys[] = [
  "schemaVersion",

  "name",
  "email",
  "schedulingType",
  "notificationTimes",
  "locale",
  "useBackupData",
  "useTelemetry",
  "usePushNotifications",
  "useInAppNotifications",
  "useDarkTheme",
  "avatar",
  "onboarding",
  "checkups",
  "periodTimestamps",
  "nextExamDate",
];

async function _rawGet(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(key);
  } else {
    return SecureStore.getItemAsync(key);
  }
}

async function _rawSet(key: string, value: string) {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export async function getSetting<T extends SettingKeys>(
  key: T
): Promise<SettingsMap[T]> {
  let storageKey: string;
  if (GLOBAL_KEYS.includes(key)) {
    storageKey = key;
  } else {
    const rawUserId = await _rawGet("userId");
    const userId = rawUserId ? JSON.parse(rawUserId) : "";
    storageKey = `user_${userId}_${key}`;
  }

  const res = await _rawGet(storageKey);
  if (res != null) {
    return JSON.parse(res);
  }
  // fallback to default
  return generateDefaultSettings()[key];
}

export async function saveSetting<T extends SettingKeys>(
  key: T,
  value: SettingsMap[T]
) {
  let storageKey: string;
  if (GLOBAL_KEYS.includes(key)) {
    storageKey = key;
  } else {
    const userId = JSON.parse((await _rawGet("userId")) || "");

    if (userId && key !== "schemaVersion") {
      const schemaKey = `user_${userId}_schemaVersion`;
      const existingSchema = await _rawGet(schemaKey);
      if (existingSchema == null) {
        // nothing persisted yet, so initialize it
        await _rawSet(schemaKey, JSON.stringify(CURRENT_SCHEMA));
      }
    }

    storageKey = `user_${userId}_${key}`;
    // if (await getSetting("useBackupData")) {
    //   backupSettings(userId, key, value);
    // }
  }
  await _rawSet(storageKey, JSON.stringify(value));
}

async function backupSettings(userId: string, key: string, value: any) {
  fetch(`${BASE_URL}/settings` + "?user_id=" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-session-token": (await _rawGet("token")) ?? "",
      "x-user-email": (await _rawGet("email")) ?? "",
    },
    body: JSON.stringify({
      [key]: value,
    }),
  });
}

export async function loadBackupSettings() {
  if ((await getSetting("useBackupData")) === true) {
    //TODO: add database specific code to load a backup
  }
}

export async function generateSettingsJson() {
  //bit of a hacky solution for now
  const settings: any = generateDefaultSettings();

  for (const key of GLOBAL_KEYS) {
    const value = await getSetting(key);
    if (value != null) {
      //if we saved the setting override the default
      settings[key] = value;
    }
  }
  for (const key of USER_SCOPED_KEYS) {
    const value = await getSetting(key);
    if (value != null) {
      //if we saved the setting override the default
      settings[key] = value;
    }
  }

  return JSON.stringify(settings);
}

export function generateDefaultSettings() {
  const def: SettingsMap = {
    name: "",
    email: "",
    token: "",
    userId: "",
    schemaVersion: CURRENT_SCHEMA,
    schedulingType: {
      day: 0,
    },
    notificationTimes: [],
    locale: "en-US",
    useBackupData: false,
    useTelemetry: false,
    useDarkTheme: true,
    usePushNotifications: false,
    useInAppNotifications: true,
    onboarding: false,
    avatar: false,
    checkups: [],
    periodTimestamps: [],
    nextExamDate: "",
  };
  return def;
}

export async function runMigrations() {
  const userSchema = await getSetting("schemaVersion");
  if (userSchema < CURRENT_SCHEMA) {
    console.log("unimplemented migrations");
  }
}
