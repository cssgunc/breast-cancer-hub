import * as SecureStore from 'expo-secure-store';

let requireAuthentication = {'requireAuthentication': true};

export type SettingKeys = 'settingKey1' | 'settingKey2'

export async function saveSetting(key: SettingKeys, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSetting(key: SettingKeys) : Promise<any | null> {
  let result = await SecureStore.getItemAsync(key);
  return result;
  // If the value retrieved is null (key invalid or no value), the Promise will return null.
  // Otherwise the Promise will return the value.
}