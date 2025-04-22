import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type SettingsMap = {
  "name": string,
  "email": string,
  "token": string,
  "userId": string,

  "schedulingType": {day: number} | "period"

  "notificationTimes": {id: number, time: string, enabled: boolean}[], //using expo-notifications trigger format

  "locale": string, //using expo-localization

  "useBackupData": boolean,
  "useTelemetry": boolean,
  "usePushNotifications": boolean,
  "useInAppNotifications": boolean,
  "useDarkTheme" : boolean,
  "avatar" : boolean,

  "onboarding" : boolean,
}

export type SettingKeys = keyof SettingsMap;

const OrderedSettingsKeys : SettingKeys[] = ["name", "email", "token", "userId", "schedulingType", "notificationTimes", "locale", "useBackupData", "useTelemetry", "usePushNotifications", "useInAppNotifications", "useDarkTheme"]

export async function getSetting<T extends SettingKeys>(key: T): Promise<SettingsMap[T]>{
  let res
  if (Platform.OS === 'web') {
    res = await AsyncStorage.getItem(key)
  }else{
    res = await SecureStore.getItemAsync(key)
  }
  if(res){
    return JSON.parse(res)
  }
  return generateDefaultSettings()[key]
}


export async function saveSetting<T extends SettingKeys>(key: T, value: SettingsMap[T]) {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }else{
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }

}

export async function backupSettings(){
  if (await getSetting("useBackupData") === true){
    //TODO: add database specific code to push a backup
  }
}

export async function loadBackupSettings(){
  if (await getSetting("useBackupData") === true){
    //TODO: add database specific code to load a backup
  }
}
//meant to be used in backupSettings()
export async function generateSettingsJson(){
  //bit of a hacky solution for now
  const settings : any = generateDefaultSettings()

  for(const key of OrderedSettingsKeys){
    const value = await getSetting(key)
    if(value!=null){ //if we saved the setting override the default
      settings[key] = value
    }
  }

  return JSON.stringify(settings)
}

export function generateDefaultSettings(){
  const def: SettingsMap = {
    name: '',
    email: '',
    token: '',
    userId: '',
    schedulingType: {
      day: 0
    },
    notificationTimes: [],
    locale: 'en-US',
    useBackupData: false,
    useTelemetry: false,
    useDarkTheme: false,
    usePushNotifications: false,
    useInAppNotifications: false,
    onboarding: false,
    avatar: false,
  }
  return def
}


export const BACKEND_URL = "https://three-clubs-sin.loca.lt"