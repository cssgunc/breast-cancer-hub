import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface CalendarComponentProps {
  isMenstruating: boolean;
}

export function CalendarComponent({ isMenstruating }: CalendarComponentProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [periodDaysByMonth, setPeriodDaysByMonth] = useState<{ [key: string]: number[] }>({});

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
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return monthNames[monthIndex];
  };

  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

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

    // Get period days for the current month
    const periodDays = periodDaysByMonth[monthKey] || [];

    // Assume the special day (self-examination day) is on the 30th
    const specialDay = 30;

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: i,
        inCurrentMonth: true,
        isPeriodDay: periodDays.includes(i),
        isSpecialDay: i === specialDay,
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

  const handleDayPress = (day: any) => {
    if (!isEditing || !day.inCurrentMonth) return;

    setPeriodDaysByMonth((prev) => {
      const updatedPeriodDays = prev[monthKey] ? [...prev[monthKey]] : [];

      if (updatedPeriodDays.includes(day.date)) {
        // Remove the day
        const index = updatedPeriodDays.indexOf(day.date);
        updatedPeriodDays.splice(index, 1);
      } else {
        // Add the day
        updatedPeriodDays.push(day.date);
      }

      return {
        ...prev,
        [monthKey]: updatedPeriodDays,
      };
    });
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
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
          {weekDays.map((day, index) => (
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
        {isMenstruating ? (
          <TouchableOpacity
            style={styles.logPeriodButton}
            onPress={toggleEditing}
          >
            <ThemedText style={styles.logPeriodButtonText}>
              {isEditing ? 'Save Changes' : 'Log Period'}
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <ThemedText style={styles.cannotLogPeriodText}>
            Cannot Log Period. To switch to the menstruating display go to settings.
          </ThemedText>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // Removed backgroundColor to make it transparent
    // backgroundColor: 'transparent',
  },
  calendarContainer: {
    borderRadius: 15,
    padding: 10,
    // Removed backgroundColor to eliminate white background
    // backgroundColor: 'white',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
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
