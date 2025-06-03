import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/style/ThemedText";
import { logSecureStoreContents, resetAppData } from "@/hooks/useSettings";
import ThemedButton from "@/components/ThemedButton";
import { useColors } from "@/components/style/ColorContext";

export default function ResetDataButton() {
  const router = useRouter();
  const { colors } = useColors();

  const handleReset = async () => {
    Alert.alert(
      "Reset All Data?",
      "This will delete all your checkup history and settings and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await resetAppData();
              console.log(await logSecureStoreContents());
              router.replace("/welcome");
            } catch {
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
