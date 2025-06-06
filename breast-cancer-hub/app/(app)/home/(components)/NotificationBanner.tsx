import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useRouter } from "expo-router";
import { useColors } from "@/components/style/ColorContext";
import { getSetting } from "@/hooks/useSettings";
import { useEffect, useState } from "react";

interface NotificationComponentProps {
  variant?: "upcoming" | "completed" | "due" | "overdue";
  date: Date;
}

export default function NotificationComponent({
  variant = "upcoming",
  date,
}: //onDismiss,
NotificationComponentProps) {
  const { colors } = useColors();
  const router = useRouter();
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    getSetting("locale").then((loc) => {
      if (loc) setLocale(loc);
    });
  }, []);

  // Determine header text and colors based on the variant
  const headerText = (() => {
    switch (variant) {
      case "overdue":
        return "! Overdue Examination !";
      case "upcoming":
        return "Upcoming Examination";
      case "due":
        return "Examination Reminder";
      default:
        return "Examination Completed!";
    }
  })();

  const bodyText = (() => {
    switch (variant) {
      case "overdue":
        return "You are overdue for a breast self examination! Complete it by tapping on this banner.";
      case "upcoming":
        return "You have a breast self examination coming up soon! Please come back when it is time to perform your exam.";
      case "due":
        return "Your breast self examination is due today! Complete it by tapping on this banner.";
      default:
        return "You have completed your monthly breast self examination! Please continue to do so every month.";
    }
  })();

  const headerTextColor =
    variant === "overdue" ? colors.darkHighlight : colors.black;
  const dateCircleBackgroundColor =
    variant === "overdue" ? "#FF4D4D" : colors.darkHighlight; // Red tint for overdue
  const containerBackgroundColor = colors.backgroundLightGray;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: 16, // Circular sides
      borderColor: "#B3B3B3",
      //borderWidth: 1,
      padding: 15,
      alignItems: "center",
      position: "relative",
      elevation: 4,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
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

  const localizedMonth = date.toLocaleString(locale, { month: "short" });
  const localizedDay = date.toLocaleString(locale, { day: "numeric" });

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
        <ThemedText style={styles.monthText}>{localizedMonth}</ThemedText>
        <ThemedText style={styles.dayText}>{localizedDay}</ThemedText>
      </View>
      {/* Right Side with Header and Body */}
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => {
          if (variant === "overdue" || variant === "due") {
            router.push("/selfExam/intro");
          }
        }}
      >
        <ThemedText
          bold
          style={[styles.headerText, { color: headerTextColor }]}
        >
          {headerText}
        </ThemedText>
        <ThemedText>{bodyText}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
