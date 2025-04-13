import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColors } from "@/components/ColorContext";

interface NotificationComponentProps {
  variant?: "default" | "overdue";
  date: Date;
  onDismiss: () => void;
}

export function NotificationComponent({
  variant = "default",
  date,
  onDismiss,
}: NotificationComponentProps) {
  const {colors, globalStyles, setDarkMode} = useColors();

  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  if (!isVisible) return null; // Do not render if the notification is dismissed

  // Determine header text and colors based on the variant
  const headerText =
    variant === "overdue" ? "Overdue Examination" : "Examination Reminder";
  const dateCircleBackgroundColor =
    variant === "overdue" ? "#FF4D4D" : colors.darkHighlight; // Red tint for overdue
  const containerBackgroundColor =
    variant === "overdue" ? "#FFE5E5" : colors.backgroundLightGray; // Lighter red background

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
  const month = monthNames[date.getMonth()];
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
      fontWeight: "bold",
      fontSize: 16,
      color: colors.black,
      marginBottom: 5,
    },
    bodyText: {
      fontSize: 14,
      color: colors.black,
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
        onPress={() => router.push("/selfExamIntro")}
      >
        <ThemedText style={styles.headerText}>{headerText}</ThemedText>
        <ThemedText style={styles.bodyText}>
          Complete your self-examination.
        </ThemedText>
      </TouchableOpacity>
      {/* Trash Icon */}
      <TouchableOpacity style={styles.trashIconContainer} onPress={onDismiss}>
        <Ionicons name="trash-outline" size={24} color={colors.darkHighlight} />
      </TouchableOpacity>
    </ThemedView>
  );
}
