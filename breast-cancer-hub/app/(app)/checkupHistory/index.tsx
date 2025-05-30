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
    },
    logContainer: {
      backgroundColor: colors.white,
      borderRadius: 15,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      // iOS shadow properties
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      // Android elevation
      elevation: 5,
      margin: 20,
    },
    titleText: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.darkHighlight,
      lineHeight: 32,
    },
    log: {
      paddingTop: 20,
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
        <View style={{ height: 30 }} />
        <ThemedText style={styles.titleText}>Checkup History</ThemedText>
        <CheckupLog />
      </ThemedView>
    </ThemedView>
  );
}
