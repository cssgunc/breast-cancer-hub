import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColors } from "@/components/style/ColorContext";

interface NotificationComponentProps {
  variant?: "default" | "overdue";
  date: Date;
  onDismiss: () => void;
}

export default function NotificationComponent({
  variant = "default",
  date,
  onDismiss,
}: NotificationComponentProps) {
  const { colors, globalStyles } = useColors();

  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  if (!isVisible) return null; // Do not render if the notification is dismissed

  // Determine header text and colors based on the variant
  const headerText =
    variant === "overdue" ? "! Overdue Examination !" : "Examination Reminder";
  const headerTextColor =
    variant === "overdue" ? colors.darkHighlight : colors.black;
  const dateCircleBackgroundColor =
    variant === "overdue" ? "#FF4D4D" : colors.darkHighlight; // Red tint for overdue
  const containerBackgroundColor = colors.backgroundLightGray;

  // Format the date
  const monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const month = monthNames[date.getMonth() - 1];
  const day = date.getDate();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: 50, // Circular sides
      borderColor: "#B3B3B3",
      borderWidth: 1,
      padding: 15,
      alignItems: "center",
      position: "relative",
    },
    dateCircle: {
      width: 60,
      height: 60,
      borderRadius: 30, // Circular
      alignItems: "center",
      justifyContent: "center",
      marginRight: 15,
    },
    monthText: {
      fontSize: 16,
      color: colors.white,
    },
    dayText: {
      fontSize: 20,
      color: colors.white,
    },
    textContainer: {
      flex: 1,
    },
    headerText: {
      marginBottom: 5,
    },
    trashIconContainer: {
      paddingLeft: 10,
      paddingRight: 5,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: containerBackgroundColor }]}
    >
      {/* Left Circle with Date */}
      <View
        style={[
          styles.dateCircle,
          { backgroundColor: dateCircleBackgroundColor },
        ]}
      >
        <ThemedText style={styles.monthText}>{month}</ThemedText>
        <ThemedText style={styles.dayText}>{day}</ThemedText>
      </View>
      {/* Right Side with Header and Body */}
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => router.push("/selfExam/intro")}
      >
        <ThemedText
          bold
          style={[styles.headerText, { color: headerTextColor }]}
        >
          {headerText}
        </ThemedText>
        <ThemedText>Complete your self-examination.</ThemedText>
      </TouchableOpacity>
      {/* Trash Icon */}
      <TouchableOpacity style={styles.trashIconContainer} onPress={onDismiss}>
        <Ionicons name="trash-outline" size={24} color={colors.darkHighlight} />
      </TouchableOpacity>
    </ThemedView>
  );
}
