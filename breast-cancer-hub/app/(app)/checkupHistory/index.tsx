import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useColors } from "@/components/style/ColorContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CheckupLog from "./(components)/CycleLogWidget";

export default function CheckupHistoryPage() {
  const router = useRouter();
  const { colors, globalStyles } = useColors();
  const styles = StyleSheet.create({
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
      justifyContent: "space-between",
    },
    navigationButton: {
      backgroundColor: "transparent",
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    titleContainer: {
      alignItems: "center",
    },
    bodyContainer: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 24,
    },
    logContainer: {
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 20,
      width: "90%",
      // Shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
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
      bgColor={colors.backgroundLightGray}
      style={globalStyles.bodyContainer}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          {/* Home Button */}
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => router.push("/home")}
          >
            <MaterialIcons name="home" size={24} color={colors.darkHighlight} />
          </TouchableOpacity>
          {/* Title */}
          <View style={styles.titleContainer}>
            <ThemedText type="title" colored>
              Exam History
            </ThemedText>
          </View>
          {/* Settings Button */}
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => router.push("/settings")}
          >
            <MaterialIcons
              name="settings"
              size={24}
              color={colors.darkHighlight}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <View style={styles.bodyContainer}>
        <View style={styles.logContainer}>
          <ThemedView style={styles.log}>
            <CheckupLog />
          </ThemedView>
          <ThemedText type="caption" italic>
            Exams cannot be edited, but you can complete a new exam before
            midnight to replace an earlier exam that day. Only the last exam of
            the day is saved.
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}
