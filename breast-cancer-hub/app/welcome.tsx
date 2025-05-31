import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  Image,
} from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import { getSetting, saveSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ThemedButton from "@/components/ThemedButton";
export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const { globalStyles } = useColors();

  useEffect(() => {
    const init = async () => {
      const value = await getSetting("name");
      setName(value);
    };

    init();
  }, []);

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
            <Image
              source={require("@/assets/images/BCH-Logo-Stacked-CMYK.png")}
              style={{ width: 250, height: 150 }}
              resizeMethod="auto"
              resizeMode="contain"
            />
            <ThemedText type="title">Self-Exam App!</ThemedText>
          </ThemedView>
          <ThemedView style={{ gap: 20, padding: 20 }}>
            <ThemedText>
              Breast Cancer Hub (BCH)'s "
              <ThemedText colored bold>
                Know Your Breasts
              </ThemedText>
              " App serves as a vital monthly reminder for individuals of{" "}
              <ThemedText colored bold>
                All Genders{" "}
              </ThemedText>
              to perform Breast Self-Exams (BSE).{" "}
              <ThemedText colored bold>
                Early Detection Saves Lives!
              </ThemedText>
            </ThemedText>
          </ThemedView>

          {!name && (
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
          )}
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
