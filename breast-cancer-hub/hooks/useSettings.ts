import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type SettingsMap = {
  "email": string,
  "token": string,

  "schedulingType": {day: number} | "period"

  "notificationTimes": {hour: number, minute: number}[], //using expo-notifications trigger format

  "locale": string, //using expo-localization

  "useBackupData": boolean,
  "useTelemetry": boolean,
  "usePushNotifications": boolean,
  "useInAppNotifications": boolean,

}

export type SettingKeys = keyof SettingsMap;

export async function getSetting<T extends SettingKeys>(key: T): Promise<SettingsMap[T] | null>{
  let res
  if (Platform.OS === 'web') {
    res = await AsyncStorage.getItem(key)
  }else{
    res = await SecureStore.getItemAsync(key)
  }
  if(res){
    return JSON.parse(res)
  }
  return null
}


export async function saveSetting<T extends SettingKeys>(key: T, value: SettingsMap[T]) {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }else{
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }

}
