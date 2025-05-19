import { Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/style/ThemedText";
import { GLOBAL_KEYS, USER_SCOPED_KEYS } from "@/hooks/useSettings";
import ThemedButton from "@/components/ThemedButton";
import { useColors } from "@/components/style/ColorContext";

export default function ResetDataButton() {
  const router = useRouter();
  const { colors } = useColors();

  const handleReset = async () => {
    Alert.alert(
      "Reset All Data?",
      "This will delete all your saved settings and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              if (Platform.OS === "web") {
                await AsyncStorage.clear();
              } else {
                for (const key of GLOBAL_KEYS) {
                  await SecureStore.deleteItemAsync(key);
                }
                const rawUserId = await SecureStore.getItemAsync("userId");
                if (rawUserId) {
                  const userId = JSON.parse(rawUserId);
                  for (const key of USER_SCOPED_KEYS) {
                    const storageKey = `user:${userId}:${key}`;
                    await SecureStore.deleteItemAsync(storageKey);
                  }
                }
              }

              router.replace("/welcome");
            } catch (err) {
              console.error("Failed to reset app data", err);
              Alert.alert("Error", "Unable to reset data. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <ThemedButton variant="secondary" onPress={handleReset}>
      <ThemedText style={{ color: colors.red }}>Reset App Data</ThemedText>
    </ThemedButton>
  );
}
