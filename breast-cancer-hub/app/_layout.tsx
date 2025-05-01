import { Stack } from "expo-router";
import { ColorProvider } from "@/components/style/ColorContext";
export default function TabLayout() {
  return (
    <ColorProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ColorProvider>
  );
}
