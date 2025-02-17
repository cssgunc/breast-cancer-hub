import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { colors } from "@/components/StyleSheet";

export default function UnderstandingBC() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.whiteOverlay}>
          <ThemedView style={styles.background}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText style={styles.understandingText}>
                Understanding
              </ThemedText>
              <ThemedText style={styles.bcText}>Breast Cancer</ThemedText>
            </ThemedView>
            <ThemedView style={styles.grayLine} />
            <ThemedText style={styles.paragraphTextTitle}>
              What is Breast Cancer?
            </ThemedText>
            <ThemedText style={styles.paragraphText}>
              Cancer: the development of abnormal cells that divide
              uncontrollably and possess the ability to infiltrate and demolish
              normal body tissue.
              {"\n\n"}In the body, there are trillions of cells that grow and
              divide to help the body function properly. Cells die when they
              become old or damaged, and new cells replace them.
              {"\n\n"}Breast Cancer is when cancer forms in the breast. This
              disease can occur in both women and men, but is far more prevalent
              in women.
            </ThemedText>
            <ThemedView style={styles.statContainer}>
              <ThemedText style={styles.statTextBold}>2nd</ThemedText>
              <ThemedText style={styles.statText}>
                most common cancer in women
              </ThemedText>
              <ThemedText style={styles.statTextBold}>1 out of 8</ThemedText>
              <ThemedText style={styles.statText}>
                women will develop invasive breast cancer over the course of her
                lifetime
              </ThemedText>
            </ThemedView>

            <LearnMoreTextContainer />

            {/* Buttons */}
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => router.back()}
              >
                <ThemedText style={styles.buttonTextBack}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNext}
                onPress={() => router.push("./purposeOfExam")}
              >
                <ThemedText style={styles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkPink,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },
  background: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  understandingText: {
    color: colors.black,
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 10,
  },
  bcText: {
    color: colors.darkPink,
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 10,
  },
  grayLine: {
    height: 2,
    backgroundColor: colors.lightestGray,
    marginVertical: 10,
  },
  paragraphTextTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraphText: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 10,
    lineHeight: 24,
  },
  statContainer: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderLeftWidth: 4,
    borderColor: colors.darkPink,
    marginVertical: 15,
  },
  statTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkPink,
  },
  statText: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
  buttonNext: {
    backgroundColor: colors.darkPink,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.darkPink,
  },
  buttonTextBack: {
    color: colors.darkPink,
    fontSize: 20,
  },
  buttonTextNext: {
    color: colors.white,
    fontSize: 20,
  },
});
