import { ColorProvider, useColors } from "@/components/style/ColorContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import {
  initializeNotificationHandler,
  registerNotifications,
} from "../notifications/notifications";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import "@/i18n";

export default function RootLayout() {
  initializeNotificationHandler();
  registerNotifications();

  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content.data.url;
        if (url) {
          router.push(url);
        }
      }
    );
    return () => subscription.remove();
  }, []);

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
