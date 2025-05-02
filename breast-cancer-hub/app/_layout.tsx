import { Stack } from "expo-router";
import { ColorProvider } from "@/components/style/ColorContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["left", "right", "top", "bottom"]}
      >
        <ColorProvider>
          <Stack screenOptions={{ headerShown: false }}></Stack>
        </ColorProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
