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

export default function SignupPage() {
  const {colors, globalStyles} = useColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  const [name, setName] = useState(""); // New state for name input
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const router = useRouter();
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

    if (confirmPassword != password) {
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
        console.log(responseData.message);
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
    userInfoLabel: {
      fontWeight: "bold",
      fontSize: 20,
      marginVertical: 10,
      alignSelf: "center",
      paddingLeft: 15,
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
    hasAccountText: {
      fontSize: 15,
      color: colors.mediumGray,
    },
    infoContainer: {
      alignItems: "center",
      paddingTop: 15,
    },
    info: {
      fontStyle: "italic",
      fontSize: 15,
      color: colors.mediumGray,
    },
  });
  

  return (
    <ThemedView style={globalStyles.loginBodyContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={globalStyles.loginTopText}>
          <Text style={globalStyles.loginTitleWelcomeText}>WELCOME</Text>
          <Text style={[globalStyles.loginTitleText, globalStyles.loginTitleGrayText]}>Register in to The</Text>
          <Text style={[globalStyles.loginTitleText, globalStyles.loginTitleHighlightText]}>Breast Cancer Hub</Text>
          <Text style={[globalStyles.loginTitleText, globalStyles.loginTitleGrayText]}>self-exam App!</Text>
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
              style={globalStyles.loginPasswordInput}
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
              style={globalStyles.loginPasswordInput}
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
          <Text style={styles.userInfoLabel}>User Information</Text>
          <View style={globalStyles.loginInputContainer}>
            <TextInput
              style={globalStyles.loginPasswordInput}
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
          <TouchableOpacity
            style={globalStyles.loginButton}
            onPress={handleSubmit}
            disabled={pending}
          >
            <Text style={globalStyles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.hasAccount}>
            <Text style={styles.hasAccountText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={globalStyles.loginLink}>Log in here</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Information is collected for Dr. Lopa's team
            </Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={globalStyles.loginLink}>Learn more here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
