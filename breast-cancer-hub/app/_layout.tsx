import { Stack } from "expo-router";
import { ColorProvider } from "@/components/ColorContext";
import {initializeNotificationHandler, registerNotifications} from "./notifications/notifications";

export default function TabLayout() {
  initializeNotificationHandler();
  registerNotifications();
  return (
    <ColorProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ColorProvider>
  );
}
