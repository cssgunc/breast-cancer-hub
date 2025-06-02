import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  Image,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import {
  getSetting,
  logSecureStoreContents,
  saveSetting,
} from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ThemedButton from "@/components/ThemedButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [returningUser, setReturningUser] = useState(false);

  const { globalStyles } = useColors();

  useEffect(() => {
    const init = async () => {
      const storedUserId = await getSetting("userId");
      if (storedUserId) {
        setReturningUser(true);
      }
      console.log("start", await getSetting("onboarding"));
    };

    init();
  }, []);

  const handleSubmit = async () => {
    console.log(await getSetting("onboarding"));
    if (!returningUser) {
      await saveSetting("userId", "local");
      await saveSetting("name", name);
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log(await logSecureStoreContents());
      console.log(await getSetting("onboarding"));
    }
    console.log(await getSetting("onboarding"));
    try {
      const onboarding = await getSetting("onboarding");
      console.log("Onboarding status:", onboarding);
      if (onboarding === false) {
        await saveSetting("onboarding", true);
        router.push("/onboarding");
      } else if (onboarding === true) {
        router.push("/home");
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={globalStyles.loginBodyContainer}>
          <ThemedView style={globalStyles.loginPopText}>
            <ThemedView style={globalStyles.loginTopText}>
              <ThemedText type="heading" colored>
                {returningUser ? "WELCOME BACK" : "WELCOME"}
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

            {!returningUser && (
              <View style={globalStyles.loginInputContainer}>
                <TextInput
                  style={globalStyles.loginInput}
                  placeholder="Name (Optional and can be changed at any time)"
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
                {returningUser ? "Enter" : "Begin"}
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
