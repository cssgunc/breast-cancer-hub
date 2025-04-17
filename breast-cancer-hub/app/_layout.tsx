import { Stack } from "expo-router";
import { ColorProvider } from "@/components/ColorContext";
import * as Notifications from 'expo-notifications';
// window.addEventListener = (x: any) => x;
// window.removeEventListener = (x: any) => x;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function TabLayout() {
  return (
    <ColorProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ColorProvider>
  );
}
