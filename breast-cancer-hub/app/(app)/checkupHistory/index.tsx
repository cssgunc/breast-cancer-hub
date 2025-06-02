import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useColors } from "@/components/style/ColorContext";
import CheckupLog from "./(components)/CycleLogWidget";

export default function CheckupHistoryPage() {
  const { colors, globalStyles } = useColors();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundGray,
      flex: 1,
    },
    logContainer: {
      backgroundColor: colors.white,
      borderRadius: 15,
      padding: 20,
      // iOS shadow properties
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      // Android elevation
      elevation: 5,
      margin: 20,
      gap: 16,
      flex: 1,
      minHeight: 0,
    },
    log: {
      flex: 1,
      minHeight: 0,
    },
    icon: {
      marginRight: 10,
    },
  });

  return (
    <ThemedView
      bgColor={colors.darkHighlight}
      style={globalStyles.bodyContainer}
    >
      <ThemedView style={[styles.logContainer]}>
        <ThemedText type="title" colored bold>
          Exam History
        </ThemedText>
        <ThemedView style={styles.log}>
          <CheckupLog />
        </ThemedView>
        <ThemedText type="caption" italic>
          Exams cannot be edited, but you can complete a new exam before
          midnight to replace an earlier exam that day. Only the last exam of
          the day is saved.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
