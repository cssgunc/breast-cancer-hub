import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const OrderedMonthNames : MonthName[] = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export type MonthName = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' |
  'July' | 'August' | 'September' | 'October' | 'November' | 'December'


export const OrderedWeekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type PeriodTimestamp = {
  date: number;
  month: number,
  year: number,
}


const periodTimetampsKey = "periodTimestamps"

export async function getPeriods() : Promise<PeriodTimestamp[]>{
  let res
  if (Platform.OS === 'web') {
    res = await AsyncStorage.getItem(periodTimetampsKey)
  }else{
    res = await SecureStore.getItemAsync(periodTimetampsKey)
  }
  if(res){
    return JSON.parse(res)
  }
  return []
}

export function addPeriod(periods: PeriodTimestamp[], newPeriod: PeriodTimestamp): PeriodTimestamp[]{
  for(const p of periods){
    if(p.date == newPeriod.date && p.month == newPeriod.month && p.year ==newPeriod.year){
      return periods
    }
  }
  periods.push(newPeriod)

  periods.sort((a,b)=>
    new Date(a.year, a.month, a.date).getTime() -  new Date(b.year, b.month, b.date).getTime() 
  )

  return periods
}


export function removePeriod(periods: PeriodTimestamp[], newPeriod: PeriodTimestamp): PeriodTimestamp[]{ //filter is not inplace
  return periods.filter(p=>p.date != newPeriod.date || p.month != newPeriod.month || p.year != newPeriod.year)
}

export async function savePeriods(value: PeriodTimestamp[]){
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(periodTimetampsKey, JSON.stringify(value));
  }else{
    await SecureStore.setItemAsync(periodTimetampsKey, JSON.stringify(value));
  }
}