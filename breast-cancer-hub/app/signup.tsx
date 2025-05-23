import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { saveSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import { ThemedText } from "@/components/style/ThemedText";
import ThemedButton from "@/components/ThemedButton";

export default function SignupPage() {
  const { colors, globalStyles } = useColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  const [name, setName] = useState(""); // New state for name input
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const router = useRouter();

  const telemetryDefined = false;
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

  const handleSubmit = () => {
    if (pending) return;

    if (!email.includes("@") || email.length === 0) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length === 0) {
      setErrorMessage("Please enter a password.");
      return;
    }

    if (name.length === 0) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (confirmPassword !== password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    submitToBackend();
  };

  const submitToBackend = () => {
    setPending(true);
    setErrorMessage(undefined);
    const data = {
      email,
      password,
      name,
    };
    const body = JSON.stringify(data);

    fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("wahh");
          return response.json().then((t) => {
            throw new Error(t.error);
          });
        }
      })
      .then((responseData) => {
        saveSetting("email", email);
        saveSetting("token", responseData.sessionToken);
        saveSetting("name", name);
        saveSetting("userId", responseData.userId);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setPending(false);
      });
  };

  const styles = StyleSheet.create({
    scrollContainer: {
      alignItems: "center",
      paddingBottom: 20,
    },
    errorLabel: {
      marginVertical: 10,
      alignSelf: "center",
      paddingLeft: 15,
      color: colors.darkHighlight,
    },
    hidden: {
      display: "none",
    },
    hasAccount: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
    },
    infoContainer: {
      alignItems: "center",
      paddingTop: 15,
    },
  });

  return (
    <ThemedView style={globalStyles.loginBodyContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={globalStyles.loginTopText}>
          <ThemedText type="heading" colored>
            WELCOME
          </ThemedText>
          <ThemedText type="title">Register for the</ThemedText>
          <ThemedText type="title" colored>
            Breast Cancer Hub
          </ThemedText>
          <ThemedText type="title">Self-Exam App!</ThemedText>
        </View>
        <View style={globalStyles.loginInputsContainer}>
          <View style={[globalStyles.loginEmailInputContainer]}>
            <TextInput
              style={globalStyles.loginInput}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <MaterialIcons
              name="mail"
              size={24}
              color={colors.darkHighlight}
              style={globalStyles.loginIcon}
            />
          </View>
          <View style={globalStyles.loginInputContainer}>
            <TextInput
              style={globalStyles.loginInput}
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              style={globalStyles.loginIcon}
            />
          </View>
          <View style={globalStyles.loginInputContainer}>
            <TextInput
              style={globalStyles.loginInput}
              placeholder="Confirm password"
              placeholderTextColor="gray"
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              style={globalStyles.loginIcon}
            />
          </View>
          <Text style={errorMessage ? styles.errorLabel : styles.hidden}>
            {" "}
            {"Error: " + errorMessage}{" "}
          </Text>
          <ThemedText type="heading">User Information</ThemedText>
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
          <ThemedButton
            style={globalStyles.loginButton}
            onPress={handleSubmit}
            disabled={pending}
          >
            Sign Up
          </ThemedButton>
          <View style={styles.hasAccount}>
            <ThemedText type="caption">Already have an account? </ThemedText>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={globalStyles.loginLink}>Log in here</Text>
            </TouchableOpacity>
          </View>
          {telemetryDefined && (
            <View style={styles.infoContainer}>
              <ThemedText type="caption" italic>
                Information is collected for Dr. Lopa's team
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Text style={globalStyles.loginLink}>Learn more here</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
