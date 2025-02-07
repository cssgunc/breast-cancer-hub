import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { saveSetting } from "@/hooks/useSettings";

export default function MenstruationSelectionScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<
    null | "menstruate" | "notMenstruate"
  >(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveChanges = () => {
    if (selectedOption) {
      // TODO: Save the selection to your data store or state management
      // Navigate to index.tsx
      //router.back();
      if (selectedOption == "menstruate") {
        saveSetting("schedulingType", "period").then(() => {
          router.back();
        });
      } else {
        router.push("/CustomizeExamDateScreen");
      }
    } else {
      setErrorMessage("Please choose an option to continue");
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require("../assets/images/BCH App Image 4.png")}
            style={styles.logoImage}
          />
        </View>
      </View>

      {/* White rectangle */}
      <View style={styles.whiteContainer}>
        {/* Texts */}
        <ThemedText style={styles.titleText}>
          Access Your Self Examination{"\n"}Schedule From Your Calendar
        </ThemedText>
        <ThemedText style={styles.subtitleText}>
          Personalize your schedule to build a routine most comfortable to you.
        </ThemedText>

        {/* Space */}
        <View style={{ height: 20 }} />

        {/* Option Buttons */}
        {/* First button */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "menstruate" && styles.optionButtonSelected,
          ]}
          onPress={() => {
            setSelectedOption("menstruate");
            setErrorMessage("");
          }}
        >
          <ThemedText
            style={[
              styles.optionButtonText,
              selectedOption === "menstruate" &&
                styles.optionButtonTextSelected,
            ]}
          >
            I menstruate.
          </ThemedText>
          <ThemedText
            style={[
              styles.optionButtonSubText,
              selectedOption === "menstruate" &&
                styles.optionButtonTextSelected,
            ]}
          >
            (I have a monthly period)
          </ThemedText>
        </TouchableOpacity>

        {/* Second button */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "notMenstruate" && styles.optionButtonSelected,
          ]}
          onPress={() => {
            setSelectedOption("notMenstruate");
            setErrorMessage("");
          }}
        >
          <ThemedText
            style={[
              styles.optionButtonText,
              selectedOption === "notMenstruate" &&
                styles.optionButtonTextSelected,
            ]}
          >
            I do not menstruate.
          </ThemedText>
          <ThemedText
            style={[
              styles.optionButtonSubText,
              selectedOption === "notMenstruate" &&
                styles.optionButtonTextSelected,
            ]}
          >
            (I do not have a monthly period)
          </ThemedText>
        </TouchableOpacity>

        {/* Error Message */}
        {errorMessage !== "" && (
          <ThemedText style={styles.errorMessage}>{errorMessage}</ThemedText>
        )}

        {/* Additional Space */}
        <View style={{ height: 40 }} />

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E93C92",
  },
  logoContainer: {
    position: "absolute",
    top: 130 - 82, // 60 (marginTop of whiteContainer) - 82 (half of logoCircle diameter)
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  logoCircle: {
    width: 164,
    height: 164,
    borderRadius: 82, // Half of the diameter
    backgroundColor: "#E93C92",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 100, // Adjust as needed
    height: 100,
    resizeMode: "contain",
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 130,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 100, // Provides space for the overlapping circle and content
  },
  titleText: {
    fontSize: 20,
    color: "#3E3E3E",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10, // Slight space under the circle
  },
  subtitleText: {
    fontSize: 15,
    color: "#3E3E3E",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  optionButton: {
    width: "60%", // Made the button smaller
    backgroundColor: "#FFF7FD",
    borderColor: "#E93C92",
    borderWidth: 3,
    borderRadius: 50,
    paddingVertical: 5, // Adjusted padding for smaller button
    alignItems: "center",
    marginTop: 15, // Slightly reduced to compact buttons
  },
  optionButtonSelected: {
    backgroundColor: "#E93C92",
    borderColor: "#A1145B",
  },
  optionButtonText: {
    fontSize: 20,
    color: "#E93C92",
    fontWeight: "bold",
  },
  optionButtonSubText: {
    fontSize: 14,
    color: "#E93C92",
  },
  optionButtonTextSelected: {
    color: "white",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#E93C92",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "50%",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
