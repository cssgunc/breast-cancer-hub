import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting, saveSetting, SettingsMap } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import CalendarComponent from "@/app/(app)/home/(components)/Calendar";

import { getCheckupDay } from "@/hooks/usePeriodData";
import ThemedButton from "@/components/ThemedButton";

type Noti = {
  id: number;
  variant: "default" | "overdue" | undefined;
  date: Date;
};

export type CalendarOnboardingProps = Partial<{
  name: string;
  isMenstruating: boolean;
}>;

export default function CalendarOnboardingScreen(
  props: CalendarOnboardingProps
) {
  const router = useRouter();
  const { colors, globalStyles } = useColors();

  const [isMenstruating, setIsMenstruating] = useState<boolean | undefined>(
    undefined
  );
  const [examDay, setExamDay] = useState<number>(1);
  const [notifications, setNotifications] = useState<Noti[]>([]);

  //load the schedulingType
  useEffect(() => {
    if (props.isMenstruating === undefined) {
      getSetting("schedulingType").then((s) => {
        setIsMenstruating(s === "period");
      });
    }
  }, [props.isMenstruating]);

  //save the examDay under its own key
  const handleSaveChanges = () => {
    saveSetting("examDay" as keyof SettingsMap, {
      day: examDay,
    }).then(() => {
      router.push("/");
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLightGray,
    },
    headerContainer: {
      backgroundColor: colors.white,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      // Shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 6,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      backgroundColor: colors.darkHighlight,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    titleContainer: {
      flexDirection: "column",
      marginLeft: 20,
    },
    examinationText: {
      fontSize: 29,
      color: colors.black,
      fontWeight: "bold",
      paddingBottom: 10,
      lineHeight: 35,
    },
    bodyContainer: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 24,
    },
    whiteBox: {
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 16,
      width: "90%",
      alignItems: "center",
      // Shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
      gap: 16,
    },
    instructionText: {
      paddingVertical: 25,
      fontSize: 20,
      color: colors.darkGray,
      fontWeight: "bold",
      textAlign: "center",
    },
    chooseDayText: {
      fontSize: 15,
      color: "black",
      textAlign: "center",
    },
    pinkRectangle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.darkHighlight,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 40,
      width: "60%",
    },
    dayDisplay: {
      flex: 1,
      fontSize: 40,
      color: colors.white,
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 50,
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
    changeAnytimeText: {
      fontSize: 15,
      color: colors.darkHighlight,
      fontStyle: "italic",
      marginTop: 10,
      marginBottom: 20,
      textAlign: "center",
    },
  });

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Header Content */}
        <View style={styles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
          {/* Title */}
          <View style={styles.titleContainer}>
            <ThemedText type="title">Set up </ThemedText>
            <ThemedText type="title" colored>
              your cycle
            </ThemedText>
          </View>
        </View>
      </View>

      <ScrollView>
        {/* Main Body */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.bodyContainer}>
            {/* White Rectangle */}
            <View style={styles.whiteBox}>
              {isMenstruating != null && (
                <CalendarComponent
                  isMenstruating={isMenstruating}
                  updateCheckupDay={() => {
                    const ts = getCheckupDay();
                    if (ts) {
                      const date = new Date(ts.year, ts.month, ts.date + 7);

                      setNotifications([
                        {
                          id: 1,
                          variant:
                            new Date().getTime() < date.getTime()
                              ? "default"
                              : "overdue",
                          date,
                        },
                      ]);
                    }
                  }}
                />
              )}
              <ThemedText type="caption" italic style={{ textAlign: "center" }}>
                Press "Edit Periods" and select the days of your most recent
                period. The blue circle automatically marks your next breast
                self-exam date.
              </ThemedText>
              <ThemedText italic colored style={{ textAlign: "center" }}>
                Your periods and menstruation status can be changed at any time.
              </ThemedText>

              <ThemedButton onPress={handleSaveChanges}>
                Save Changes
              </ThemedButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ThemedView>
  );
}
