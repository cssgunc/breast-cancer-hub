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
          setEmail("");
          setPassword("");
          router.push("/")
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
      <ThemedView style={styles.bodyContainer}>
        <ThemedView style={styles.popText}>
          <ThemedView style={styles.topText}>
            <ThemedText style={styles.welcome}>WELCOME</ThemedText>
            <ThemedText style={styles.register}>Log in to The</ThemedText>
            <ThemedText style={styles.bchText}>Breast Cancer Hub</ThemedText>
            <ThemedText style={styles.selfExam}>self-exam App!</ThemedText>
          </ThemedView>
          <ThemedView style={styles.inputsContainer}>
            <ThemedView style={styles.emailInputContainer}>
              <TextInput
                style={styles.emailInput}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
              />
              <MaterialIcons
                style={styles.iconPositions}
                name="mail"
                size={24}
                color="#e93c92"
              />
            </ThemedView>
            <ThemedView style={styles.inputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <MaterialIcons
                style={styles.iconPositions}
                name="lock"
                size={24}
                color="gray"
              />
            </ThemedView>
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => router.push("/")}
            >
              <ThemedText style={styles.link}>Forgot your password?</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <ThemedText
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                Log In
              </ThemedText>
            </TouchableOpacity>
            <ThemedView style={styles.noAccount}>
              <ThemedText style={styles.noAccountText}>
                Don't have an account?{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <ThemedText style={styles.link}>Create one here</ThemedText>
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
    backgroundColor: "white",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  popText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  welcome: {
    color: "#e93c92",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  register: {
    color: "#333",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 3,
    lineHeight: 40,
  },
  bchText: {
    color: "#e93c92",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 3,
    lineHeight: 40,
  },
  selfExam: {
    color: "#333",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 3,
    lineHeight: 40,
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 60,
  },
  emailInputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: "#e93c92",
    borderWidth: 2,
    height: 60,
  },
  emailInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
  },
  iconPositions: {
    marginHorizontal: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    paddingRight: 20,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#e93c92",
    width: "80%",
    borderRadius: 40,
    marginVertical: 30,
    paddingVertical: 10,
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  noAccount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    color: "#666666",
  },
  noAccountText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  link: {
    color: "#68C4FF",
    fontSize: 15,
  },
});
