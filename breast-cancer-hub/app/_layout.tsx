import { Stack, useRouter } from "expo-router";
import { ColorProvider } from "@/components/ColorContext";
import {initializeNotificationHandler, registerNotifications} from "./notifications/notifications";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";


export default function TabLayout() {
  initializeNotificationHandler();
  registerNotifications();

  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log(response)
      const url = response.notification.request.content.data.url;
      if (url) {
        //console.log(url)
        router.push(url);
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <ColorProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ColorProvider>
  );
}
