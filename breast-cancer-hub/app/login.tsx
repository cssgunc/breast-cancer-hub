import {
  Animated,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { saveSetting } from "@/hooks/useSettings";
import { colors } from "@/components/StyleSheet";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!email.includes("@") || email.length === 0) {
      alert("Please enter a valid email address.");
      return;
    }

    const data = { email, password };

    fetch("http://localhost:3000/auth", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert("Login successful");
          router.push("/");
          saveSetting("email", data.email);
          saveSetting("token", data.sessionToken);
          saveSetting("name", data.name);
          saveSetting("userId", data.userId);
        } else if (data.error) {
          alert(`Error: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.scrollView}
    >
      <ThemedView style={commonLoginSignupStyles.bodyContainer}>
        <ThemedView style={commonLoginSignupStyles.popText}>
          <ThemedView style={commonLoginSignupStyles.topText}>
            <ThemedText style={commonLoginSignupStyles.titleWelcomeText}>WELCOME</ThemedText>
            <ThemedText style={[commonLoginSignupStyles.titleText, commonLoginSignupStyles.titleGrayText]}>Log in to The</ThemedText>
            <ThemedText style={[commonLoginSignupStyles.titleText, commonLoginSignupStyles.titlePinkText]}>Breast Cancer Hub</ThemedText>
            <ThemedText style={[commonLoginSignupStyles.titleText, commonLoginSignupStyles.titleGrayText]}>self-exam App!</ThemedText>
          </ThemedView>
          <ThemedView style={commonLoginSignupStyles.inputsContainer}>
            <ThemedView style={commonLoginSignupStyles.emailInputContainer}>
              <TextInput
                style={commonLoginSignupStyles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
              />
              <MaterialIcons
                style={commonLoginSignupStyles.icon}
                name="mail"
                size={24}
                color={colors.darkPink}
              />
            </ThemedView>
            <ThemedView style={commonLoginSignupStyles.inputContainer}>
              <TextInput
                style={commonLoginSignupStyles.passwordInput}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <MaterialIcons
                style={commonLoginSignupStyles.icon}
                name="lock"
                size={24}
                color="gray"
              />
            </ThemedView>
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => router.push("/")}
            >
              <ThemedText style={commonLoginSignupStyles.link}>Forgot your password?</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={commonLoginSignupStyles.button} onPress={handleSubmit}>
              <ThemedText
                style={commonLoginSignupStyles.buttonText}
              >
                Log In
              </ThemedText>
            </TouchableOpacity>
            <ThemedView style={styles.noAccount}>
              <ThemedText style={styles.noAccountText}>
                Don't have an account?{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <ThemedText style={commonLoginSignupStyles.link}>Create one here</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    paddingRight: 20,
    marginTop: 5,
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

export const commonLoginSignupStyles = StyleSheet.create({
  bodyContainer: {//COMMON
    flex: 1,
    padding: 10,
  },
  topText: {//COMMON
    marginBottom: 20,
    marginTop: 100,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  popText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWelcomeText: {//COMMON
    color: colors.darkPink,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
    marginBottom: 3,
  },
  titleText: {//COMMON
    color: colors.darkGray,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 35,
    marginTop: 3,
    lineHeight: 40,
  },
  titleGrayText: {//COMMON
    color: colors.darkGray,
  },
  titlePinkText: {//COMMON
    color: colors.darkPink,
  },

  inputsContainer: {//COMMON
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {//COMMON
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundGray,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 60,
  },
  emailInputContainer: {//COMMON
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: colors.darkPink,
    borderWidth: 2,
    height: 60,
  },
  input: {//COMMON with emailInput
    flex: 1,
    fontSize: 15,
    height: 60,
    //borderColor: colors.darkPink,
  },
  passwordInput: {//COMMON
    flex: 1,
    fontSize: 15,
    height: 60,
  },
  icon: {//COMMON
    marginHorizontal: 10,
  },
  button: {//COMMON
    backgroundColor: colors.darkPink,
    height: 60,
    width: "80%",
    borderRadius: 40,
    justifyContent: "center",
    marginTop: 20,
    
  },
  buttonText: {//COMMON
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  link: {//COMMON
    color: colors.blue,
    fontSize: 15,
  },
})