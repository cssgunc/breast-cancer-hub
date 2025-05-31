import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function NotificationSummary({
  notificationTimes,
}: {
  notificationTimes: {
    id: number;
    hour: number;
    minute: number;
    enabled: boolean;
  }[];
}) {
  const router = useRouter();

  const enabledTimes = notificationTimes.filter((t) => t.enabled);

  const fmt = (h: number, m: number) =>
    `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

  const goToSettings = () => router.push("/settings/notifications");

  return (
    <ThemedView>
      {enabledTimes.length > 0 ? (
        <View>
          <ThemedText>
            You have the following push notifications enabled:
          </ThemedText>

          {enabledTimes.map((t) => (
            <ThemedText key={t.id} style={{ marginLeft: 10 }}>
              • {fmt(t.hour, t.minute)}
            </ThemedText>
          ))}
        </View>
      ) : (
        <TouchableOpacity onPress={goToSettings}>
          <ThemedText colored>
            Push notifications are disabled. Click here to change.
          </ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}
