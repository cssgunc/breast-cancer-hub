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
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting, saveSetting, SettingsMap } from "@/hooks/useSettings";
import { useColors } from "@/components/ColorContext";
import { CalendarComponent } from "@/components/Calendar";

import { getCheckupDay } from "@/hooks/usePeriodData";

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
  const { colors } = useColors();

  const [id, setId] = useState({ userId: "" });
  const [isMenstruating, setIsMenstruating] = useState<boolean | undefined>(
    undefined
  );
  const [examDay, setExamDay] = useState<number>(1);
  const [notifications, setNotifications] = useState<Noti[]>([]);

  //load the userId
  useEffect(() => {
    getSetting("userId").then((userId) => {
      setId({ userId });
    });
  }, []);

  //once we have userId, load the schedulingType
  useEffect(() => {
    if (id.userId && props.isMenstruating === undefined) {
      getSetting(`${id.userId}_schedulingType` as keyof SettingsMap).then(
        (s) => {
          setIsMenstruating(s === "period");
        }
      );
    }
  }, [id.userId, props.isMenstruating]);

  //save the examDay under its own key
  const handleSaveChanges = () => {
    saveSetting(`${id.userId}_examDay` as keyof SettingsMap, {
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
      paddingTop: Platform.OS === "ios" ? 60 : 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      // Shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
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
    customizeYourText: {
      paddingTop: 20,
      fontSize: 29,
      color: colors.darkHighlight,
      fontWeight: "bold",
      paddingBottom: 10,
      lineHeight: 35,
    },
    yourText: {
      fontSize: 29,
      color: colors.black,
      fontWeight: "bold",
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
      paddingHorizontal: 20,
      paddingTop: 30,
    },
    whiteBox: {
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 20,
      width: "90%",
      alignItems: "center",
      // Shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
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
    saveButton: {
      backgroundColor: colors.darkHighlight,
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: "center",
      marginTop: 70,
      width: "50%",
    },
    saveButtonText: {
      fontSize: 16,
      color: colors.white,
      fontWeight: "bold",
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
            <ThemedText style={styles.customizeYourText}>
              Select the days{" "}
              <ThemedText style={styles.yourText}>that</ThemedText>
            </ThemedText>
            <ThemedText style={styles.examinationText}>
              you have menstruated
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
              <ThemedText style={styles.instructionText}>
                Press the 'Edit Periods' button at the bottom right of the
                calendar and select the days you have menstruated. This will
                calculate the date (shown in blue) that you should complete your
                breast self-examination.
              </ThemedText>

              <View style={{ height: 20 }} />

              {isMenstruating != null && (
                <CalendarComponent
                  isMenstruating={isMenstruating}
                  userId={id.userId}
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

              <View style={{ height: 10 }} />

              <ThemedText style={styles.changeAnytimeText}>
                This can be changed at any time
              </ThemedText>
            </View>

            {/* Save Changes Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <ThemedText style={styles.saveButtonText}>
                Save Changes
              </ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ThemedView>
  );
}
