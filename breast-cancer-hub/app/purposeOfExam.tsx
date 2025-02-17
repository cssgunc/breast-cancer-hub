import React from "react";
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
import { colors, globalStyles } from "@/components/StyleSheet";

export default function SelfExamInfo() {
  const router = useRouter();

  return (
    <ThemedView style={globalStyles.bodyContainerDarkPink}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      <ScrollView contentContainerStyle={globalStyles.scrollContent}>
        <ThemedView style={globalStyles.whiteOverlay}>
          {/* Page Title */}
          <ThemedText style={[globalStyles.titleText, styles.titleText]}>The Purpose of</ThemedText>
          <ThemedText style={[globalStyles.titleTextDarkPink, styles.highlightedTitleText]}>
            A Self-Exam
          </ThemedText>

          <ThemedView style={globalStyles.grayLine} />

          {/* Notice Section */}
          <ThemedText style={styles.noticeTitle}>Notice:</ThemedText>
          <ThemedText style={styles.noticeText}>
            A self-exam is not a substitute to the recommended annual breast
            cancer screening with mammograms (x-rays of the breast).
            <Text style={styles.boldText}>
              {" "}
              Annual mammograms are essential.
            </Text>
          </ThemedText>

          <ThemedText style={styles.noticeText2}>
            The most recent American Cancer Society guidelines recommend women
            ages <Text style={styles.highlightText}>40 to 44</Text> should
            consider annual breast cancer screenings with mammograms. Women ages{" "}
            <Text style={styles.highlightText}>45 to 54</Text> should get
            mammograms every year. Women{" "}
            <Text style={styles.highlightText}>55 and older</Text> should switch
            to mammograms every 2 years or can continue yearly screening.
          </ThemedText>

          {/* Information Section */}
          <ThemedText style={styles.infoBoldText}>
            Dr. Lopa’s self-exams are effective precautionary and preventative
            measures for detecting symptoms of breast cancer.
          </ThemedText>
          <ThemedText style={styles.infoText}>
            Being familiar with how our breasts look and feel can help us notice
            symptoms such as lumps, pain, or changes in size that may be of
            concern and respond to them.
          </ThemedText>

          <ThemedView style={globalStyles.grayLine} />

          {/* Quotes Section */}
          <ThemedView style={styles.quotesContainer}>
            <ThemedText style={styles.quoteText}>
              “The difference is, this could save your life.”
            </ThemedText>
            <ThemedText style={styles.quoteText}>
              “Mammograms are important, self-exams are how you are going to
              find cancer early and save your life.”
            </ThemedText>
            <ThemedText style={styles.quoteText}>
              “Early detection is the key.”
            </ThemedText>
          </ThemedView>

          <LearnMoreTextContainer />

          {/* Navigation Buttons */}
          <ThemedView style={globalStyles.buttonBackNextContainer}>
            <TouchableOpacity
              style={globalStyles.buttonBack}
              onPress={() => router.back()}
            >
              <ThemedText style={globalStyles.buttonTextBack}>Back</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.buttonNext}
              onPress={() => router.push("/")}
            >
              <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    paddingTop: 25,
  },
  highlightedTitleText: {
    marginBottom: 15,
    paddingTop: 10,
  },
  noticeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkPink,
    marginTop: 20,
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
  },
  noticeText2: {
    fontSize: 15,
    color: colors.darkGray,
    lineHeight: 24,
    fontStyle: "italic",
    marginTop: 20,
  },
  highlightText: {
    color: colors.darkPink,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  infoText: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 10,
    lineHeight: 24,
  },
  infoBoldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.black,
    marginVertical: 15,
    lineHeight: 24,
    marginTop: 20,
  },
  quotesContainer: {
    marginVertical: 20,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.darkPink,
    textAlign: "center",
    marginBottom: 10,
  },
});
