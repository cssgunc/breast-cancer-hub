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

export default function SelfExamInfo() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.whiteOverlay}>
          {/* Page Title */}
          <ThemedText style={styles.titleText}>The Purpose of</ThemedText>
          <ThemedText style={styles.highlightedTitleText}>
            A Self-Exam
          </ThemedText>

          <ThemedView style={styles.grayLine} />

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

          <ThemedView style={styles.grayLine} />

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
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => router.back()}
            >
              <ThemedText style={styles.buttonTextBack}>Back</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => router.push("/")}
            >
              <ThemedText style={styles.buttonTextNext}>Next</ThemedText>
            </TouchableOpacity>
          </ThemedView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#E93C92",
  },
  iconWrapper: {
    backgroundColor: "#EFCEE6",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    paddingTop: 25,
  },
  highlightedTitleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E93C92",
    marginBottom: 15,
    paddingTop: 10,
  },
  noticeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E93C92",
    marginTop: 20,
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 16,
    color: "#000000",
    lineHeight: 24,
  },
  noticeText2: {
    fontSize: 15,
    color: "#3E3E3E",
    lineHeight: 24,
    fontStyle: "italic",
    marginTop: 20,
  },
  highlightText: {
    color: "#E93C92",
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  infoText: {
    fontSize: 16,
    color: "#000000",
    marginVertical: 10,
    lineHeight: 24,
  },
  infoBoldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
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
    color: "#E93C92",
    textAlign: "center",
    marginBottom: 10,
  },
  infoSourceText: {
    fontSize: 12,
    color: "#999999",
    marginTop: 20,
    fontStyle: "italic",
  },
  learnMoreText: {
    fontSize: 12,
    color: "#68C4FF",
    fontWeight: "bold",
  },
  learnMoreTextContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ACACAC",
  },
  buttonNext: {
    backgroundColor: "#E93C92",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#E93C92",
  },
  buttonTextBack: {
    color: "#E93C92",
    fontSize: 18,
  },
  buttonTextNext: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  grayLine: {
    height: 2,
    backgroundColor: "#D3D3D3",
    marginVertical: 10,
  },
});
