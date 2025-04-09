import { Stack } from "expo-router";
window.addEventListener = (x: any) => x;
export default function TabLayout() {
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
