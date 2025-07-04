import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../style/ColorContext";
import { ThemedText } from "../style/ThemedText";

type Tab = {
  route: "home" | "calendar" | "checkupHistory" | "settings";
  label: string;
  icon:
    | "home-outline"
    | "calendar-clear-outline"
    | "time-outline"
    | "settings-outline";
  activeIcon: "home" | "calendar-clear" | "time" | "settings";
};

const TABS: Tab[] = [
  { route: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
  {
    route: "calendar",
    label: "Calendar",
    icon: "calendar-clear-outline",
    activeIcon: "calendar-clear",
  },
  {
    route: "checkupHistory",
    label: "History",
    icon: "time-outline",
    activeIcon: "time",
  },
  {
    route: "settings",
    label: "Settings",
    icon: "settings-outline",
    activeIcon: "settings",
  },
];

export default function BottomNavBar() {
  const router = useRouter();
  const segments = useSegments();
  // The last segment corresponds to the current route file name
  const currentRoute = segments[segments.length - 1] || "home";

  const { colors } = useColors();
  const { width } = useWindowDimensions();
  const showLabels = width >= 400; // Adjust threshold as needed

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 60,
      borderTopWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#fff",
    },
    tabItem: {
      paddingVertical: 16,
      alignItems: "center",
      flex: 1,
    },
    activeTab: {
      borderTopWidth: 4,
      borderColor: colors.darkHighlight,
    },
  });
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = currentRoute === tab.route;
        return (
          <TouchableOpacity
            key={tab.route}
            style={[styles.tabItem, isActive && styles.activeTab]}
            onPress={() => {
              // Only navigate if not already on the current tab
              if (!isActive) {
                // Add fromBottomNav parameter to indicate navigation source
                router.push({
                  pathname: `/${tab.route}`,
                  params: { fromBottomNav: "1" },
                });
              }
            }}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              style={{ color: colors.darkHighlight }}
            />
            {showLabels && <ThemedText colored>{tab.label}</ThemedText>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
