import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

export function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const prevMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return prevMonthDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const nextMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return nextMonthDate;
    });
  };

  const getMonthName = (monthIndex: number) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthIndex];
  };

  // Generate calendar days
  const generateCalendar = () => {
    const calendarDays = [];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    // Days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      calendarDays.push({
        date: daysInPrevMonth - i,
        inCurrentMonth: false,
        isPeriodDay: false,
        isSpecialDay: false,
      });
    }

    // Period days (second week)
    const periodDays = [];
    for (let i = 8; i <= 14; i++) {
      periodDays.push(i);
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: i,
        inCurrentMonth: true,
        isPeriodDay: periodDays.includes(i),
        isSpecialDay: i === 30,
      });
    }

    // Days from next month to fill the grid
    const totalDays = calendarDays.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: i,
        inCurrentMonth: false,
        isPeriodDay: false,
        isSpecialDay: false,
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
          {weekDays.map((day, index) => (
            <ThemedText key={index} style={styles.weekDayText}>{day}</ThemedText>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={styles.daysContainer}>
          {calendarDays.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
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
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

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
  specialDayText: {
    fontWeight: 'bold',
    color: 'black',
  },
});
