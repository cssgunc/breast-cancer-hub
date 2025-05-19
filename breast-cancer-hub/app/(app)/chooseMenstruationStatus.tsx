import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useRouter } from "expo-router";
import { saveSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";

export default function MenstruationSelectionScreen() {
  const router = useRouter();
  const { colors, globalStyles } = useColors();
  const [selectedOption, setSelectedOption] = useState<
    null | "menstruate" | "notMenstruate"
  >(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveChanges = () => {
    if (selectedOption) {
      if (selectedOption == "menstruate") {
        saveSetting("schedulingType", "period").then(() => {
          router.push("/customizeCalendar");
        });
      } else {
        router.push("/customizeExamDate");
      }
    } else {
      setErrorMessage("Please choose an option to continue");
    }
  };

  const styles = StyleSheet.create({
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
      backgroundColor: colors.darkHighlight,
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
      backgroundColor: colors.white,
      marginTop: 130,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 100, // Provides space for the overlapping circle and content
    },
    subtitleText: {
      marginTop: 10,
      marginBottom: 20,
    },
    optionButton: {
      width: "80%", // Made the button smaller
      alignSelf: "center",
      paddingHorizontal: 16,
      backgroundColor: colors.backgroundLightGray,
      borderColor: colors.darkHighlight,
      borderWidth: 3,
      borderRadius: 50,
      paddingVertical: 8, // Adjusted padding for smaller button
      alignItems: "center",
      marginTop: 16, // Slightly reduced to compact buttons
    },
    optionButtonSelected: {
      backgroundColor: colors.darkHighlight,
      borderColor: colors.darkestHighlight,
    },
    optionButtonText: {
      fontSize: 20,
      color: colors.darkHighlight,
      fontWeight: "bold",
    },
    optionButtonSubText: {
      fontSize: 16,
      color: colors.darkHighlight,
    },
    optionButtonTextSelected: {
      color: colors.white,
    },
    errorMessage: {
      color: "red",
      fontSize: 14,
      fontStyle: "italic",
      marginTop: 10,
      textAlign: "center",
    },
    saveButton: {
      width: "50%",
      marginTop: 20,
    },
  });

  return (
    <ThemedView
      bgColor={colors.darkHighlight}
      style={globalStyles.bodyContainer}
    >
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require("@/assets/images/BCH ribbon.png")}
            style={styles.logoImage}
          />
        </View>
      </View>

      {/* White rectangle */}
      <View style={styles.whiteContainer}>
        {/* Texts */}
        <ThemedText type="heading">
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
        <ThemedButton style={styles.saveButton} onPress={handleSaveChanges}>
          Save Changes
        </ThemedButton>
      </View>
    </ThemedView>
  );
}
