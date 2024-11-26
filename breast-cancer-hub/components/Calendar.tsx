import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { addPeriod, GLOBAL_PERIOD_DATA, initPeriods, isCheckupDay, isPeriodDay, OrderedMonthNames, OrderedWeekdayNames, PeriodTimestamp, removePeriod } from '@/hooks/usePeriodData';
import { getSetting } from '@/hooks/useSettings';

type CalendarItem = {
  p: Date;
  date: number;
  inCurrentMonth: boolean;
  isPeriodDay: boolean;
  isSpecialDay: boolean;
}

interface CalendarComponentProps {
  isMenstruating: boolean;
  updateCheckupDay: ()=>void
}

export function CalendarComponent({ isMenstruating, updateCheckupDay }: CalendarComponentProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [periodDay, setPeriodDay] = useState<number>(28)
  const [_seed, setSeed] = useState(0);

  useEffect(()=>{
    getSetting("schedulingType").then(type=>{
      if(type!="period"){
        setPeriodDay(type.day)
      }
    })
  }, [])

  useEffect(()=>{
    initPeriods().then(original=>{
      if(original){
        updateCheckupDay()
        setSeed(Math.random())
      }
    })
  }, [])

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return prevMonthDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return nextMonthDate;
    });
  };

  const getMonthName = (monthIndex: number) => {
    return OrderedMonthNames[monthIndex];
  };

  // Generate calendar days
  const generateCalendar = () : CalendarItem[] => {
    const calendarDays = [];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const currMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);



    // Days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      const p = new Date(prevMonth.getTime())
      p.setDate(daysInPrevMonth-i)
      calendarDays.push({
        p,
        date: daysInPrevMonth - i,
        inCurrentMonth: false,
        isPeriodDay: isPeriodDay(p),
        isSpecialDay: isMenstruating ? isCheckupDay(p) : startingDay - 1 === periodDay,
      });
    }

    // Get period days for the current month

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      const p = new Date(currMonth.getTime())
      p.setDate(i)
      calendarDays.push({
        p,
        date: i,
        inCurrentMonth: true,
        isPeriodDay: isPeriodDay(p),
        isSpecialDay: isMenstruating ? isCheckupDay(p) : i === periodDay,
      });
    }

    // Days from next month to fill the grid
    const totalDays = calendarDays.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

    for (let i = 1; i <= remainingDays; i++) {
      const p = new Date(nextMonth.getTime())
      p.setDate(i)
      calendarDays.push({
        p,
        date: i,
        inCurrentMonth: false,
        isPeriodDay: isPeriodDay(p),
        isSpecialDay: isMenstruating ? isCheckupDay(p) : i===periodDay,
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar();


  const handleDayPress = (day: CalendarItem) => {
    if (!isEditing || !day.inCurrentMonth) return;

    if(day.isPeriodDay){
      removePeriod(day.p)
    }else{
      addPeriod(day.p)
    }
    updateCheckupDay()
    setSeed(Math.random())
  };

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
            <ThemedText style={styles.monthText}>{getMonthName(currentDate.getMonth())} </ThemedText>
            <ThemedText style={styles.yearText}>{currentDate.getFullYear()}</ThemedText>
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
          {calendarDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dayContainer}
              onPress={() => handleDayPress(day)}
              activeOpacity={isEditing ? 0.5 : 1}
            >
              {day.isPeriodDay ? (
                <View style={styles.periodDayCircle}>
                  <ThemedText style={styles.periodDayText}>{day.date}</ThemedText>
                </View>
              ) : day.isSpecialDay ? (
                <View style={styles.specialDayCircle}>
                  <ThemedText style={styles.specialDayText}>{day.date}</ThemedText>
                </View>
              ) : (
                <View
                  style={[
                    styles.dayWrapper,
                    isEditing && day.inCurrentMonth && styles.editModeDayWrapper,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.dayText,
                      !day.inCurrentMonth && styles.greyDayText,
                    ]}
                  >
                    {day.date}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Log Period Button or Message */}
        {isMenstruating ? (<View style={styles.footer}>
          {
            isEditing ? (
              <TouchableOpacity onPress={()=>setIsEditing(false)} style={{display:"flex", flexDirection: "row", gap: 10}}>
              <ThemedText>Confirm Changes</ThemedText>
              <Ionicons name="checkmark" size={24} color="#000000" />
            </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={()=>setIsEditing(true)} style={{display:"flex", flexDirection: "row", gap: 10}}>
              <ThemedText>Edit Periods</ThemedText>
              <Ionicons name="create-outline" size={24} color="#000000" />
            </TouchableOpacity>
            )
          }
        </View>) : (<View style={styles.footer}></View>)
        }
        
        
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
  },
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
    paddingBottom: 20,
  },
  dayContainer: {
    width: '14.28%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  dayWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editModeDayWrapper: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderRadius: 25,
    width: 50,
    height: 50,
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
  specialDayText: {
    fontWeight: 'bold',
    color: 'black',
  },
  logPeriodButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#E93C92',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '50%',
  },
  logPeriodButtonText: {
    textAlign: 'center',
    color: '#E93C92',
    fontWeight: 'bold',
  },
  cannotLogPeriodText: {
    marginTop: 10,
    fontSize: 12,
    color: 'grey',
    textAlign: 'center',
  },
});
