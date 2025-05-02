import { Stack } from "expo-router";
import { ColorProvider, useColors } from "@/components/style/ColorContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "@/i18n";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ColorProvider>
        <ThemedSafeArea>
          <Stack screenOptions={{ headerShown: false }}></Stack>
        </ThemedSafeArea>
      </ColorProvider>
    </SafeAreaProvider>
  );
}

function ThemedSafeArea({ children }: { children: React.ReactNode }) {
  const { colors } = useColors();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.darkHighlight }}
      edges={["top", "left", "right", "bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}
