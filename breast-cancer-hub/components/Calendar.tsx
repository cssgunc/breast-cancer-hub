import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { addPeriod, getPeriods, OrderedMonthNames, OrderedWeekdayNames, PeriodTimestamp, removePeriod, savePeriods } from '@/hooks/usePeriodData';
import { getSetting, saveSetting } from '@/hooks/useSettings';


const generateCalendar = (currentDate: {month: number, year: number}, periodInput: PeriodTimestamp[] | undefined | number) => {
  const calendarDays = [];

  const firstDayOfMonth = new Date(currentDate.year, currentDate.month, 1);
  const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

  const daysInMonth = new Date(currentDate.year, currentDate.month + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentDate.year, currentDate.month, 0).getDate();

  const prevMonth = new Date(firstDayOfMonth.getTime())
  prevMonth.setMonth(prevMonth.getMonth()-1)
  const nextMonth = new Date(firstDayOfMonth.getTime())
  nextMonth.setMonth(nextMonth.getMonth()+1)



  let specialDay = undefined
  let recurringDay : undefined | number = undefined
  let periodDays : PeriodTimestamp[]  | undefined = undefined
  if(typeof periodInput == "number"){
    recurringDay = periodInput
  }else if(periodInput!=undefined){
    periodDays = periodInput
    const lastPeriod: PeriodTimestamp | undefined = periodDays[periodDays.length - 1]
    if (lastPeriod != undefined) {
      specialDay = new Date(lastPeriod.year, lastPeriod.month, lastPeriod.date + 4)
    }
  }



  // Days from previous month
  for (let i = startingDay - 1; i >= 0; i--) {
    calendarDays.push({
      ts: {
        date: daysInPrevMonth - i,
        month: prevMonth.getUTCMonth(),
        year: prevMonth.getUTCFullYear()
      },
      date: daysInPrevMonth - i,
      inCurrentMonth: false,
      isPeriodDay: periodDays && periodDays.some(d => d.date == daysInPrevMonth - i && d.month == prevMonth.getUTCMonth() && prevMonth.getUTCFullYear() == d.year),
      isSpecialDay: daysInPrevMonth - i == recurringDay || specialDay && specialDay.getDate() === daysInPrevMonth- i && specialDay.getUTCMonth() === prevMonth.getUTCMonth() && prevMonth.getUTCFullYear() === specialDay.getUTCFullYear()
    });
  }

  // Days in current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      ts: {
        date: i,
        month: currentDate.month,  
        year: currentDate.year
      },
      date: i,
      inCurrentMonth: true,
      isPeriodDay: periodDays && periodDays.some(d => d.date == i && d.month == currentDate.month && currentDate.year == d.year),
      isSpecialDay:  i == recurringDay || specialDay && specialDay.getDate() === i && specialDay.getUTCMonth() === currentDate.month && currentDate.year === specialDay.getUTCFullYear(),
    });
  }

  // Days from next month to fill the grid
  const totalDays = calendarDays.length;
  const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      ts: {
        date: i,
        month: nextMonth.getUTCMonth(),
        year: nextMonth.getUTCFullYear()
      },
      date: i,
      inCurrentMonth: false,
      isPeriodDay: periodDays && periodDays.some(d => d.date == i && d.month == nextMonth.getUTCMonth() && nextMonth.getUTCFullYear() == d.year), //probably shouldnt be pressed, but there could be weird local time hijinks 
      isSpecialDay:  i == recurringDay || specialDay && specialDay.getDate() === i && specialDay.getUTCMonth() === nextMonth.getUTCMonth() && nextMonth.getUTCFullYear() === specialDay.getUTCFullYear(),
    });
  }
  return calendarDays
};


const currentDate = new Date();
const og_date = {month: currentDate.getMonth(), year: currentDate.getFullYear()}
let cached_periods : PeriodTimestamp[] | undefined | number = undefined
let cal_fetched = false

export function CalendarComponent() {
  const [currentDay, setCurrentDay] = useState(og_date)
  //const [calendarDays, setCalendarDays] = useState(generateCalendar(currentDay, cached_periods))
  const [editMode, setEditMode] = useState(false)
  const [_seed, setSeed] = useState(0) //pretty jank force reload
  const calendarDays = generateCalendar(currentDay, cached_periods)

  const goToPreviousMonth = () => {
    setCurrentDay(prevMonth => {
      const date = new Date(prevMonth.year, prevMonth.month - 1, 1);
      return {
        month: date.getMonth(),
        year: date.getFullYear()
      }
    });
  };

  const goToNextMonth = () => {
    setCurrentDay(prevMonth => {
      const date = new Date(prevMonth.year, prevMonth.month + 1, 1);
      return {
        month: date.getMonth(),
        year: date.getFullYear()
      }
    });
  };

  useEffect(() => { //basically a primitive onmounted
    getSetting('schedulingType').then(schedulingType => {
      if ((schedulingType == "period")) {
        if(!cal_fetched){
          getPeriods().then(periods => {
            cal_fetched = true
            cached_periods = periods
            setSeed(Math.random())
          })
        }
      }else{
        cached_periods = schedulingType.day
      }
    })
  }, [])


  return (
    <ThemedView style={styles.container}>
      {/* Calendar Container with Rounded Corners and Shadow */}
      <View style={styles.calendarContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Ionicons name="chevron-back-outline" size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.headerTitle}>
            <ThemedText style={styles.monthText}>{OrderedMonthNames[currentDay.month]} </ThemedText>
            <ThemedText style={styles.yearText}>{currentDay.year}</ThemedText>
          </View>

          <TouchableOpacity onPress={goToNextMonth}>
            <Ionicons name="chevron-forward-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Week Days */}
        <View style={styles.weekDaysContainer}>
          {OrderedWeekdayNames.map((day, index) => (
            <ThemedText key={index} style={styles.weekDayText}>{day}</ThemedText>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={styles.daysContainer}>
          {calendarDays.map((day, index) => {
            if (editMode) {
              return (
                <View key={index} style={ styles.dayContainer }>
                  <Pressable
                    role="checkbox"
                    aria-checked={day.isPeriodDay}
                    style={[styles.checkboxBase, day.isPeriodDay && styles.checkboxChecked, day.isSpecialDay && styles.specialCheckboxChecked, day.isSpecialDay && styles.specialCheckboxBase]}
                    onPress={() => {
                      if(typeof cached_periods === "number"){
                        cached_periods = day.ts.date
                        saveSetting('schedulingType', {day: day.ts.date})
                        setSeed(Math.random())
                      }else if(cached_periods!=undefined){
                        if(day.isPeriodDay){
                          const newPeriods = removePeriod(cached_periods, day.ts)
                          savePeriods(newPeriods)
                          cached_periods = newPeriods
                          setSeed(Math.random())
                          //setCalendarDays(newCal)
                        }else{
                          const newPeriods = addPeriod(cached_periods, day.ts)
                          savePeriods(newPeriods)
                          cached_periods = newPeriods
                          setSeed(Math.random())
                          //setCalendarDays(newCal)
                        }
                      }
                    }}>
                    {(day.isPeriodDay || day.isSpecialDay) && <Ionicons name="checkmark" size={24} color="white" />}
                  </Pressable>
                  {day.isPeriodDay ? (
                      <ThemedText style={styles.dayText}>{day.date}</ThemedText>
                  ) : day.isSpecialDay ? (
                      <ThemedText style={styles.dayText}>{day.date}</ThemedText>
                  ) : (
                    <ThemedText style={[styles.dayText, !day.inCurrentMonth && styles.greyDayText]}>{day.date}</ThemedText>
                  )}
                </View>
              )
            } else {
              return (
                <View key={index} style={styles.dayContainer}>
                  <Pressable
                    role="checkbox"
                    style={[styles.invisCheckboxBase]}>
                  </Pressable>
                  {day.isPeriodDay ? (
                    <View style={styles.periodDayCircle}>
                      <ThemedText style={styles.periodDayText}>{day.date}</ThemedText>
                    </View>
                  ) : day.isSpecialDay ? (
                    <View style={styles.specialDayCircle}>
                      <ThemedText style={styles.specialDayText}>{day.date}</ThemedText>
                    </View>
                  ) : (
                    <ThemedText style={[styles.dayText, !day.inCurrentMonth && styles.greyDayText]}>{day.date}</ThemedText>
                  )}
                </View>
              )
            }

          })}
        </View>

        <View style={styles.footer}>
        {
            editMode ? (
              <ThemedText>Confirm Changes</ThemedText>
            ) : (
              <ThemedText>Edit Periods</ThemedText>
            )
          }
          {
            editMode ? (
              <TouchableOpacity onPress={()=>setEditMode(false)}>
              <Ionicons name="checkmark" size={24} color="#000000" />
            </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={()=>setEditMode(true)}>
              <Ionicons name="create-outline" size={24} color="#000000" />
            </TouchableOpacity>
            )
          }

        </View>

      </View>
    </ThemedView>
  );
}

const getMonthName = (monthIndex: number) => {
  return OrderedMonthNames[(monthIndex + 12) % 12];
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // Android elevation
    elevation: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  monthText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 18,
    color: '#E93C92',
    fontWeight: 'bold',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  weekDayText: {
    width: '14.28%',
    textAlign: 'center',
    color: '#E93C92',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 40,
  },
  dayContainer: {
    width: '14.28%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  dayText: {
    color: 'black',
  },
  greyDayText: {
    color: 'grey',
  },
  periodDayCircle: {
    backgroundColor: '#E93C92',
    borderWidth: 2,
    borderColor: '#A1145B',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodDayText: {
    color: 'white',
  },
  specialDayCircle: {
    backgroundColor: '#68C4FF',
    borderWidth: 2,
    borderColor: '#1A74AD',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regularDayCircle: {
    //backgroundColor: '#68C4FF',
    borderWidth: 2,
    //borderColor: '#1A74AD',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialDayText: {
    fontWeight: 'bold',
    color: 'black',
  },


  invisCheckboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },

  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#efcee6',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#efcee6',
  },
  specialCheckboxChecked: {
    backgroundColor: '#e93c92',
  },
  specialCheckboxBase : {
    borderColor: '#e93c92'
  }
});
