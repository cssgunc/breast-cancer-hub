import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import CalendarComponent from "@/app/(app)/Calendar";
import ThemedButton from "@/components/ThemedButton";
import { useCheckupData } from "@/hooks/CheckupContext";
import { PeriodTimestamp } from "@/hooks/PeriodContext";

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

  const { scheduleNextCheckup } = useCheckupData();
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
    router.push("/");
  };

  return (
    <ThemedView
      bgColor={colors.backgroundLightGray}
      style={globalStyles.bodyContainer}
    >
      {/* Header */}
      <View style={customizeStyles.headerContainer}>
        {/* Header Content */}
        <View style={customizeStyles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity
            style={[
              customizeStyles.backButton,
              { backgroundColor: colors.darkHighlight },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
          {/* Title */}
          <View style={customizeStyles.titleContainer}>
            <ThemedText type="title">Set Up </ThemedText>
            <ThemedText type="title" colored>
              Your Cycle
            </ThemedText>
          </View>
        </View>
      </View>

      <ScrollView>
        {/* Main Body */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={customizeStyles.bodyContainer}>
            {/* White Rectangle */}
            <View style={customizeStyles.whiteBox}>
              <ThemedText type="caption" italic style={{ textAlign: "center" }}>
                Breast self-exams are due{" "}
                <ThemedText colored bold>
                  7 days after the start of each period.{" "}
                </ThemedText>
              </ThemedText>
              {isMenstruating != null && (
                <CalendarComponent
                  isMenstruating={isMenstruating}
                  onDayChanged={async (newTimestamps: PeriodTimestamp[]) => {
                    await scheduleNextCheckup(newTimestamps);
                  }}
                />
              )}
              <ThemedText type="caption" italic style={{ textAlign: "center" }}>
                Select the start date of your most recent period. The blue
                circle automatically marks your next breast self-exam date.
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

export const customizeStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    // Shadow
    shadowColor: "black",
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

  bodyContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 24,
  },
  whiteBox: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    width: "90%",
    alignItems: "center",
    // Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    gap: 16,
  },
});
