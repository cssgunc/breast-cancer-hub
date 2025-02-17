import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { BACKEND_URL, saveSetting } from "@/hooks/useSettings";
import { colors } from "@/components/StyleSheet";
import { commonLoginSignupStyles } from "./login";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  const [name, setName] = useState(""); // New state for name input
  const [errorMessage, setErrorMessage] = useState<undefined | string>();
  const router = useRouter();

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

    fetch(BACKEND_URL + "/auth", {
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
        router.push("/");
        saveSetting("email", email);
        saveSetting("token", responseData.sessionToken);
        saveSetting("name", name);

        //setErrorMessage(responseData.message);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setPending(false);
      });
  };

  return (
    <ThemedView style={commonLoginSignupStyles.bodyContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={commonLoginSignupStyles.topText}>
          <Text style={commonLoginSignupStyles.titleWelcomeText}>WELCOME</Text>
          <Text style={[commonLoginSignupStyles.titleText, commonLoginSignupStyles.titleGrayText]}>Register in to The</Text>
          <Text style={[commonLoginSignupStyles.titleText, commonLoginSignupStyles.titlePinkText]}>Breast Cancer Hub</Text>
          <Text style={[commonLoginSignupStyles.titleText, commonLoginSignupStyles.titleGrayText]}>self-exam App!</Text>
        </View>
        <View style={commonLoginSignupStyles.inputsContainer}>
          <View style={[commonLoginSignupStyles.emailInputContainer]}>
            <TextInput
              style={commonLoginSignupStyles.input}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
            <MaterialIcons
              name="mail"
              size={24}
              color={colors.darkPink}
              style={commonLoginSignupStyles.icon}
            />
          </View>
          <View style={commonLoginSignupStyles.inputContainer}>
            <TextInput
              style={commonLoginSignupStyles.passwordInput}
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              style={commonLoginSignupStyles.icon}
            />
          </View>
          <View style={commonLoginSignupStyles.inputContainer}>
            <TextInput
              style={commonLoginSignupStyles.passwordInput}
              placeholder="Confirm password"
              placeholderTextColor="gray"
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              style={commonLoginSignupStyles.icon}
            />
          </View>
          <Text style={errorMessage ? styles.errorLabel : styles.hidden}>
            {" "}
            {"Error: " + errorMessage}{" "}
          </Text>
          <Text style={styles.userInfoLabel}>User Information</Text>
          <View style={commonLoginSignupStyles.inputContainer}>
            <TextInput
              style={commonLoginSignupStyles.passwordInput}
              placeholder="Name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
            />
            <MaterialIcons
              name="person"
              size={24}
              color="gray"
              style={commonLoginSignupStyles.icon}
            />
          </View>
          <TouchableOpacity
            style={commonLoginSignupStyles.button}
            onPress={handleSubmit}
            disabled={pending}
          >
            <Text style={commonLoginSignupStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.hasAccount}>
            <Text style={styles.hasAccountText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={commonLoginSignupStyles.link}>Log in here</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Information is collected for Dr. Lopa's team
            </Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={commonLoginSignupStyles.link}>Learn more here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

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
    color: colors.darkPink,
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
