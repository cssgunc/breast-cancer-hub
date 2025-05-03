import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import { getSetting, saveSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import ThemedButton from "@/components/ThemedButton";
export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const { colors, globalStyles } = useColors();

  const handleSubmit = async () => {
    saveSetting("name", name);
    saveSetting("userId", "local");

    try {
      const onboarding = await getSetting("onboarding");
      if (onboarding === false) {
        await saveSetting("onboarding", true);
        router.push("/onboarding");
      } else if (onboarding === true) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemedView style={globalStyles.loginBodyContainer}>
      <ThemedView style={globalStyles.loginPopText}>
        <ThemedView style={globalStyles.loginTopText}>
          <ThemedText type="heading" colored>
            WELCOME
          </ThemedText>
          <ThemedText type="title">to the</ThemedText>
          <ThemedText type="title" colored>
            Breast Cancer Hub
          </ThemedText>
          <ThemedText type="title">Self-Exam App!</ThemedText>
        </ThemedView>
        <ThemedText>
          Early detection saves lives. Please enter your name for the app to
          refer to you by.
        </ThemedText>
        <View style={globalStyles.loginInputContainer}>
          <TextInput
            style={globalStyles.loginInput}
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          <MaterialIcons
            name="person"
            size={24}
            color="gray"
            style={globalStyles.loginIcon}
          />
        </View>
        <ThemedView style={globalStyles.loginInputsContainer}>
          <ThemedButton onPress={handleSubmit} style={globalStyles.loginButton}>
            Begin
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
