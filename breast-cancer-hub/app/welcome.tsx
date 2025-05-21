import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
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
    saveSetting("userId", "local");
    saveSetting("name", name);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
          <ThemedView style={{ gap: 20, padding: 20 }}>
            <ThemedText>
              Breast Cancer Hub (BCH)'s "Know Your Breasts" App serves as a
              vital monthly reminder for individuals of All Genders to perform
              Breast Self-Exams (BSE). Early detection saves lives!
            </ThemedText>
          </ThemedView>

          <View style={globalStyles.loginInputContainer}>
            <TextInput
              style={globalStyles.loginInput}
              placeholder="Name (optional, can be changed at any time)"
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
            <ThemedButton
              onPress={handleSubmit}
              style={globalStyles.loginButton}
            >
              Begin
            </ThemedButton>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
