import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useState } from "react";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getSetting, saveSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { colors, globalStyles } = useColors();

  const handleSubmit = () => {
    if (!email.includes("@") || email.length === 0) {
      alert("Please enter a valid email address.");
      return;
    }
    const data = { email, password };
    fetch(`${BASE_URL}/auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.message) {
          saveSetting("email", data.email);
          saveSetting("token", data.sessionToken);
          saveSetting("name", data.name);
          saveSetting("userId", data.userId);
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
        } else if (data.error) {
          alert(`Error: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: colors.white,
    },
    scrollViewContainer: {
      flexGrow: 1,
    },

    noAccount: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      color: colors.mediumGray,
    },
    noAccountText: {
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.scrollView}
    >
      <ThemedView style={globalStyles.loginBodyContainer}>
        <ThemedView style={globalStyles.loginPopText}>
          <ThemedView style={globalStyles.loginTopText}>
            <ThemedText type="heading" colored>
              WELCOME
            </ThemedText>
            <ThemedText type="title">Log in to the</ThemedText>
            <ThemedText type="title" colored>
              Breast Cancer Hub
            </ThemedText>
            <ThemedText type="title">Self-Exam App!</ThemedText>
          </ThemedView>
          <ThemedView style={globalStyles.loginInputsContainer}>
            <ThemedView style={globalStyles.loginEmailInputContainer}>
              <TextInput
                style={globalStyles.loginInput}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <MaterialIcons
                style={globalStyles.loginIcon}
                name="mail"
                size={24}
                color={colors.darkHighlight}
              />
            </ThemedView>
            <ThemedView style={globalStyles.loginInputContainer}>
              <TextInput
                style={globalStyles.loginInput}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                onSubmitEditing={handleSubmit}
              />
              <MaterialIcons
                style={globalStyles.loginIcon}
                name="lock"
                size={24}
                color="gray"
              />
            </ThemedView>
            <ThemedButton
              style={globalStyles.loginButton}
              onPress={handleSubmit}
            >
              Log In
            </ThemedButton>
            <ThemedView style={styles.noAccount}>
              <ThemedText style={styles.noAccountText}>
                Don't have an account?{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <ThemedText type="link" bold>
                  Create one here
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
