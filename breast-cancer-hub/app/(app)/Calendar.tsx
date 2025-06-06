import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import {
  usePeriodData,
  OrderedMonthNames,
  OrderedWeekdayNames,
  PeriodTimestamp,
} from "@/hooks/PeriodContext";
import { useColors } from "@/components/style/ColorContext";
import { useCheckupData } from "@/hooks/CheckupContext";

type CalendarItem = {
  date: Date;
  day: number;
  inCurrentMonth: boolean;
  isPeriodDay: boolean;
  isCheckupDay: boolean;
  isFuture: boolean;
};

interface CalendarComponentProps {
  isMenstruating: boolean;
  onDayChanged: (timestamps: PeriodTimestamp[]) => Promise<void>;
  onMonthChanged?: (month: number, year: number) => void;

  initialMonth?: number;
  initialYear?: number;
}

export default function CalendarComponent({
  isMenstruating,
  onDayChanged,
  onMonthChanged,
  initialMonth,
  initialYear,
}: CalendarComponentProps) {
  const { colors } = useColors();

  const [currentDate, setCurrentDate] = useState(() => {
    if (initialMonth && initialYear) {
      return new Date(initialYear, initialMonth - 1, 1);
    }
    return new Date();
  });
  const [isEditing] = useState(true);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { timestamps, addPeriod, removePeriod } = usePeriodData();
  const { nextCheckup } = useCheckupData();

  useEffect(() => {
    if (onMonthChanged) {
      onMonthChanged(currentDate.getMonth(), currentDate.getFullYear());
    }
  }, [currentDate, onMonthChanged]);

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonthDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return nextMonthDate;
    });
  };

  const getMonthName = (monthIndex: number) => {
    return OrderedMonthNames[monthIndex];
  };

  function isPeriodDay(value: Date) {
    const isDay = timestamps.some(
      (p) =>
        p.date === value.getUTCDate() &&
        p.month === value.getUTCMonth() + 1 &&
        p.year === value.getUTCFullYear()
    );
    return isDay;
  }

  function isCheckupDay(value: Date) {
    if (nextCheckup) {
      return (
        value.getFullYear() === nextCheckup.getFullYear() &&
        value.getMonth() === nextCheckup.getMonth() &&
        value.getDate() === nextCheckup.getDate()
      );
    }
    return false;
  }

  // Generate calendar days
  const generateCalendar = (): CalendarItem[] => {
    const calendarDays = [];

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startingDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const daysInPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const currMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    // Days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      const p = new Date(prevMonth.getTime());
      p.setDate(daysInPrevMonth - i);
      calendarDays.push({
        date: p,
        day: daysInPrevMonth - i,
        inCurrentMonth: false,
        isPeriodDay: isMenstruating && isPeriodDay(p),
        isCheckupDay: isCheckupDay(p),
        isFuture: p > today,
      });
    }

    // Get period days for the current month
    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      const p = new Date(currMonth.getTime());
      p.setDate(i);
      calendarDays.push({
        date: p,
        day: i,
        inCurrentMonth: true,
        isPeriodDay: isMenstruating && isPeriodDay(p),
        isCheckupDay: isCheckupDay(p),
        isFuture: p > today,
      });
    }

    // Days from next month to fill the grid
    const totalDays = calendarDays.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

    for (let i = 1; i <= remainingDays; i++) {
      const p = new Date(nextMonth.getTime());
      p.setDate(i);
      calendarDays.push({
        date: p,
        day: i,
        inCurrentMonth: false,
        isPeriodDay: isMenstruating && isPeriodDay(p),
        isCheckupDay: isCheckupDay(p),
        isFuture: p > today,
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar();

  const handleDayPress = async (day: CalendarItem) => {
    if (!isEditing) return;
    let newTimestamps;
    if (day.isPeriodDay) {
      newTimestamps = await removePeriod(day.date);
    } else {
      newTimestamps = await addPeriod(day.date);
    }
    await onDayChanged(newTimestamps);
  };

  const styles = StyleSheet.create({
    footer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingTop: 10,
      paddingBottom: 10,
      gap: 10,
    },
    calendarContainer: {
      backgroundColor: colors.white,
      borderRadius: 15,
      padding: 10,
      // iOS shadow properties
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      // Android elevation
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 20,
    },
    headerTitle: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    monthText: {
      fontSize: 18,
      color: colors.black,
      fontWeight: "bold",
    },
    yearText: {
      fontSize: 18,
      color: colors.darkHighlight,
      fontWeight: "bold",
    },
    weekDaysContainer: {
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 10,
    },
    weekDayText: {
      width: "14.28%",
      textAlign: "center",
      color: colors.darkHighlight,
    },
    daysContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    dayContainer: {
      width: "14.28%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
    },
    dayWrapper: {
      alignItems: "center",
      justifyContent: "center",
    },
    editModeDayWrapper: {
      borderWidth: 2,
      borderColor: colors.black,
      borderStyle: "dotted",
      borderRadius: 25,
      width: 43,
      height: 43,
    },
    dayText: {
      color: colors.black,
    },
    greyDayText: {
      color: "grey",
    },
    periodDayCircle: {
      backgroundColor: colors.darkHighlight,
      borderWidth: 2,
      borderColor: colors.darkestHighlight,
      borderRadius: 25,
      width: 43,
      height: 43,
      alignItems: "center",
      justifyContent: "center",
    },
    periodDayText: {
      color: colors.white,
    },
    specialDayCircle: {
      backgroundColor: colors.blue,
      borderWidth: 2,
      borderColor: "#1A74AD", //dark blue?
      borderRadius: 25,
      width: 43,
      height: 43,
      alignItems: "center",
      justifyContent: "center",
    },
    specialDayText: {
      fontWeight: "bold",
      color: colors.black,
    },
    logPeriodButton: {
      alignSelf: "center",
      backgroundColor: colors.white,
      borderColor: colors.darkHighlight,
      borderWidth: 2,
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: "50%",
    },
    logPeriodButtonText: {
      textAlign: "center",
      color: colors.darkHighlight,
      fontWeight: "bold",
    },
    cannotLogPeriodText: {
      marginTop: 10,
      fontSize: 12,
      color: "grey",
      textAlign: "center",
    },

    editToggleButton: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
  });

  return (
    <ThemedView>
      {/* Calendar Container with Rounded Corners and Shadow */}
      <View style={styles.calendarContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <ThemedText style={styles.monthText}>
              {getMonthName(currentDate.getMonth())}{" "}
            </ThemedText>
            <ThemedText style={styles.yearText}>
              {currentDate.getFullYear()}
            </ThemedText>
          </View>

          <TouchableOpacity onPress={goToNextMonth}>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>

        {/* Week Days */}
        <View style={styles.weekDaysContainer}>
          {OrderedWeekdayNames.map((day, index) => (
            <ThemedText key={index} style={styles.weekDayText}>
              {day}
            </ThemedText>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={styles.daysContainer}>
          {calendarDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dayContainer}
              onPress={() => {
                if (isEditing && !day.isFuture) {
                  handleDayPress(day);
                }
              }}
              activeOpacity={day.isFuture || !isEditing ? 1 : 0.5}
            >
              {day.isPeriodDay ? (
                <View style={styles.periodDayCircle}>
                  <ThemedText style={styles.periodDayText}>
                    {day.day}
                  </ThemedText>
                </View>
              ) : day.isCheckupDay ? (
                <View style={styles.specialDayCircle}>
                  <ThemedText style={styles.specialDayText}>
                    {day.day}
                  </ThemedText>
                </View>
              ) : (
                <View
                  style={[
                    styles.dayWrapper,
                    isEditing && !day.isFuture && styles.editModeDayWrapper,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.dayText,
                      !day.inCurrentMonth && styles.greyDayText,
                    ]}
                  >
                    {day.day}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}
