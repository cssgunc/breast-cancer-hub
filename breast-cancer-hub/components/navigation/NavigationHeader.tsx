// Unused navigation header with home and settings, potentially useful for future navigation overhauls
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../style/ThemedView";
import { useColors } from "@/components/style/ColorContext";
import { Image } from "react-native";

export default function NavigationHeader() {
  const { colors, globalStyles } = useColors();
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1] || "";

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.darkHighlight,
      minHeight: 60,
    },
    iconWrapper: {
      backgroundColor: colors.lightHighlight,
      borderRadius: 30,
      padding: 8,
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
    },
    logoContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      height: 40,
      width: 120,
    },
  });

  return (
    <ThemedView style={styles.container} bgColor={colors.darkHighlight}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => router.push("/home")}
      >
        <Ionicons name="home" size={24} color={colors.darkHighlight} />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/BCH-Logo-Stacked-WHITE.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => router.push("/settings")}
      >
        <MaterialIcons name="settings" size={24} color={colors.darkHighlight} />
      </TouchableOpacity>
    </ThemedView>
  );
}
