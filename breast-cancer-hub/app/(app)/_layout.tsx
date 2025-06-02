import { Slot, useSegments } from "expo-router";
import { View } from "react-native";
import { CheckupProvider } from "@/hooks/CheckupContext";
import { PeriodProvider } from "@/hooks/PeriodContext";
import BottomNavBar from "@/components/navigation/BottomNavTabs";

export default function Protection() {
  const segments = useSegments();
  const leaf = segments[segments.length - 1];
  const tabs = ["home", "calendar", "settings", "checkupHistory"];
  const showFooter = tabs.includes(leaf);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <CheckupProvider>
        <PeriodProvider>
          <Slot />
          {showFooter && <BottomNavBar />}
        </PeriodProvider>
      </CheckupProvider>
    </View>
  );
}
