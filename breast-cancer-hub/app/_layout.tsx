import { Stack } from "expo-router";
import { ColorProvider } from "@/components/ColorContext";
// window.addEventListener = (x: any) => x;
// window.removeEventListener = (x: any) => x;
export default function TabLayout() {
  return (
    <ColorProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ColorProvider>
  );
}
