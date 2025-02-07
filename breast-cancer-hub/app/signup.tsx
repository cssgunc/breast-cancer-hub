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
    <ThemedView style={styles.bodyContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topText}>
          <Text style={styles.welcome}>WELCOME</Text>
          <Text style={styles.register}>Register in to The</Text>
          <Text style={styles.bchText}>Breast Cancer Hub</Text>
          <Text style={styles.selfExam}>self-exam App!</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={[styles.inputContainer, styles.emailContainer]}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
            <MaterialIcons
              name="mail"
              size={24}
              color="#e93c92"
              style={styles.icon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
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
              style={styles.icon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm password"
              placeholderTextColor="gray"
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <MaterialIcons
              name="lock"
              size={24}
              color="gray"
              style={styles.icon}
            />
          </View>
          <Text style={errorMessage ? styles.errorLabel : styles.hidden}>
            {" "}
            {"Error: " + errorMessage}{" "}
          </Text>
          <Text style={styles.userInfoLabel}>User Information</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
            />
            <MaterialIcons
              name="person"
              size={24}
              color="gray"
              style={styles.icon}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={pending}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.noAccount}>
            <Text style={styles.noAccountText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.link}>Log in here</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Information is collected for Dr. Lopa's team
            </Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.link}>Learn more here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  topText: {
    marginBottom: 20,
    marginTop: 100,
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
  emailContainer: {
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
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    height: 60,
    borderColor: "#e93c92",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    height: 60,
  },
  icon: {
    marginHorizontal: 10,
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
    color: "#e93c92",
  },
  hidden: {
    display: "none",
  },
  button: {
    backgroundColor: "#e93c92",
    height: 60,
    width: "80%",
    borderRadius: 40,
    justifyContent: "center",
    marginTop: 20,
  },
  noAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  noAccountText: {
    fontSize: 15,
    color: "#666666",
  },
  link: {
    color: "#68C4FF",
    fontSize: 15,
  },
  infoContainer: {
    alignItems: "center",
    paddingTop: 15,
  },
  info: {
    fontStyle: "italic",
    fontSize: 15,
    color: "#666666",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
