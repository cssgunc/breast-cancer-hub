import { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { saveSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import { customizeStyles } from "./customizeCalendar";
import ThemedButton from "@/components/ThemedButton";
import { useCheckupData } from "@/hooks/CheckupContext";
import { usePeriodData } from "@/hooks/PeriodContext";

export default function CustomizeExamDateScreen({
  fromBottomNav,
}: {
  fromBottomNav?: boolean;
}) {
  const router = useRouter();
  const { colors, globalStyles } = useColors();
  const [examDay, setExamDay] = useState<number>(1); // Default examination day as number
  const { scheduleNextCheckup } = useCheckupData();
  const { rescheduleNotifications } = usePeriodData();

  const handleSaveChanges = () => {
    saveSetting("schedulingType", {
      day: examDay,
    }).then(async () => {
      await rescheduleNotifications();
      await scheduleNextCheckup();
      router.push("/home");
    });
  };

  const HOLD_DELAY = 500;
  const REPEAT_INTERVAL = 100;

  const holdTimeout = useRef<NodeJS.Timeout>();
  const holdInterval = useRef<NodeJS.Timeout>();

  const handleHoldStart = (action: () => void) => {
    action();
    holdTimeout.current = setTimeout(() => {
      holdInterval.current = setInterval(action, REPEAT_INTERVAL);
    }, HOLD_DELAY);
  };

  const handleHoldEnd = () => {
    clearTimeout(holdTimeout.current);
    clearInterval(holdInterval.current);
  };

  const incrementDay = () => {
    setExamDay((prev) => (prev === 31 ? 1 : prev + 1));
  };

  const decrementDay = () => {
    setExamDay((prev) => (prev === 1 ? 31 : prev - 1));
  };

  const styles = StyleSheet.create({
    changeAnytimeText: {
      fontSize: 15,
      color: colors.darkHighlight,
      fontStyle: "italic",
      textAlign: "center",
    },
    saveButton: {
      backgroundColor: colors.darkHighlight,
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: "center",
      width: "50%",
    },
    saveButtonText: {
      fontSize: 16,
      color: colors.white,
      fontWeight: "bold",
    },
    chevronContainer: {
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: 10,
    },
    chevronButton: {
      marginVertical: 5,
    },
    chevronCircle: {
      backgroundColor: colors.mediumHighlight,
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    dayDisplay: {
      width: 128,
      fontSize: 40,
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 50,
    },
    pinkRectangle: {
      backgroundColor: colors.darkHighlight,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 20,
      paddingHorizontal: 10,
      alignSelf: "center",
    },
    content: {
      width: "100%",
      alignItems: "center",
      gap: 32,
    },
  });

  return (
    <ThemedView
      bgColor={colors.backgroundLightGray}
      style={globalStyles.bodyContainer}
    >
      {/* Header */}
      <View style={customizeStyles.headerContainer}>
        {/* Header Content */}
        <View style={customizeStyles.headerContent}>
          {/* Conditional navigation - back button or home  */}
          {!fromBottomNav ? (
            <TouchableOpacity
              style={[
                customizeStyles.chevronButton,
                { backgroundColor: colors.darkHighlight },
              ]}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={customizeStyles.homeButton}
              onPress={() => router.push("/home")}
            >
              <MaterialIcons
                name="home"
                size={24}
                color={colors.darkHighlight}
              />
            </TouchableOpacity>
          )}
          {/* Title */}
          <View style={customizeStyles.titleContainer}>
            <ThemedText type="title">Customize Your</ThemedText>
            <ThemedText type="title" colored>
              Examination Date
            </ThemedText>
          </View>
          {/* Settings - only from bottom nav  */}
          {fromBottomNav ? (
            <TouchableOpacity
              style={customizeStyles.homeButton}
              onPress={() => router.push("/settings")}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color={colors.darkHighlight}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }}></View>
          )}
        </View>
      </View>
      {/* Main Body */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={customizeStyles.bodyContainer}>
          {/* White Rectangle */}
          <View style={customizeStyles.whiteBox}>
            <ThemedView style={styles.content}>
              <ThemedText type="heading">
                Choose a day for your monthly self examination.
              </ThemedText>
              <ThemedText>
                Please perform a self exam on the same date each month.
              </ThemedText>
              <ThemedText>
                Pick or enter a date between 1 and 31. (Months with less days
                will default to the last day)
              </ThemedText>
              {/* Highlight Rectangle */}
              <View style={styles.pinkRectangle}>
                {/* Display Exam Day */}
                <TextInput
                  value={examDay.toString()}
                  style={styles.dayDisplay}
                  onChangeText={(text) => {
                    const num = parseInt(text, 10);
                    if (!isNaN(num)) {
                      if (num >= 1 && num <= 28) {
                        setExamDay(num);
                      } else if (num > 28) {
                        setExamDay(28);
                      } else if (num < 1) {
                        setExamDay(1);
                      }
                    }
                  }}
                  maxLength={2}
                  textAlign="center"
                  selectTextOnFocus
                />
                {/* Up and Down Buttons */}
                <View style={styles.chevronContainer}>
                  <TouchableOpacity
                    onPressIn={() => handleHoldStart(incrementDay)}
                    onPressOut={handleHoldEnd}
                    style={styles.chevronButton}
                  >
                    <View style={styles.chevronCircle}>
                      <Ionicons
                        name="chevron-up"
                        size={20}
                        color={colors.white}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPressIn={() => handleHoldStart(decrementDay)}
                    onPressOut={handleHoldEnd}
                    style={styles.chevronButton}
                  >
                    <View style={styles.chevronCircle}>
                      <Ionicons
                        name="chevron-down"
                        size={20}
                        color={colors.white}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <ThemedText style={styles.changeAnytimeText}>
                This can be changed at any time.
              </ThemedText>

              <ThemedButton onPress={handleSaveChanges}>
                Save Changes
              </ThemedButton>
            </ThemedView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}
