import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import CheckBox from "expo-checkbox";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { getSetting } from "../hooks/useSettings";
import { LearnMoreTextContainer } from "../components/LearnMoreText";
import { globalStyles } from "@/components/StyleSheet";

export default function HomeScreen() {
  const router = useRouter();

  // NOT TYPE SAFE
  const { symptoms } = useLocalSearchParams();

  const getHasSymptoms = (s: string) => {
    //return symptoms.some((value) => value);
    return (s as string).includes("1");
  };

  useEffect(() => {
    console.log(symptoms);
    console.log(symptoms as string);
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={styles.whiteOverlay}>
        <ThemedView style={styles.topButtons}></ThemedView>

        <ThemedText style={styles.highlightedTitleText}>
          Based On Your Symptoms
        </ThemedText>
        <ThemedText style={styles.titleText}>Recommended actions</ThemedText>

        <ThemedView style={globalStyles.grayLine} />

        {/* Debug button */}
        {/* <TouchableOpacity style={styles.buttonBack} onPress={() => logSelection()}>
          <ThemedText style={styles.buttonTextBack}>log</ThemedText>
        </TouchableOpacity> */}
      </ThemedView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.whiteOverlay}>
          {/* Info Section */}
          {getHasSymptoms(symptoms as string) ? (
            <ThemedView style={styles.whiteOverlay}>
              <ThemedView style={styles.noticeContainer}>
                <MaterialIcons name="error" size={28} color="#E93C92" />
                <ThemedText style={styles.instructionTextBoldBlack}>
                  Notice!
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.elevatedBox}>
                <ThemedText style={styles.instructionTextBold}>
                  A visit to your doctor is recommended based on our assessment.
                </ThemedText>
                <ThemedText style={styles.instructionTextBoldBlack}>
                  But don't worry, most lumps are not cancerous!
                </ThemedText>
              </ThemedView>

              <LearnMoreTextContainer />

              {/* Navigation Buttons */}
              <ThemedView style={styles.singleButtonContainer}>
                {/* UPDATE THIS IF THE CONTACT URL CHANGES */}
                <TouchableOpacity
                  style={globalStyles.buttonNext}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.breastcancerhub.org/new-page-3"
                    )
                  }
                >
                  <ThemedText style={globalStyles.buttonTextNext}>
                    Schedule an appointment
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ) : (
            <ThemedView style={styles.whiteOverlay}>
              <ThemedView style={styles.noticeContainer}>
                <MaterialIcons name="check-circle" size={28} color="#339F00" />
                <ThemedText style={styles.instructionTextBoldBlack}>
                  You're all good!
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.elevatedBox}>
                <ThemedText style={styles.instructionTextBoldBlack}>
                  Please continue to perform your next self-examination next
                  month.
                </ThemedText>
              </ThemedView>

              <LearnMoreTextContainer />

              <ThemedView style={styles.singleButtonContainer}>
                {/* TODO: Make this clear the route history */}
                <TouchableOpacity
                  style={globalStyles.buttonNext}
                  onPress={() => router.push("/")}
                >
                  <ThemedText style={globalStyles.buttonTextNext}>
                    Return home
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E93C92",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: "#EFCEE6",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeContainer: {
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    columnGap: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  highlightedTitleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E93C92",
    marginBottom: 15,
    paddingTop: 10,
  },
  elevatedBox: {
    backgroundColor: "#FFF7FD",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkBoxContainer: {
    flexDirection: "column",
    marginBottom: 20,
    alignContent: "center",
    marginTop: 5,
  },
  instructionTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E93C92",
    textAlign: "center",
  },
  instructionTextBoldBlack: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  singleButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
