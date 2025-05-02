import { useRef, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { useColors } from "@/components/style/ColorContext";
import { RelativePathString, router } from "expo-router";

export const ONBOARDING_STEPS = [
  "/onboarding/breastCancerIntro",
  "/onboarding/purposeOfSelfExam",
  "/onboarding/screeningAndTechniques",
  "/onboarding/additionalInfo",
  //"/onboarding/consentToTelemetry",
  "/onboarding/chooseLanguage",
  "/onboarding/chooseColorScheme",
  "/onboarding/chooseAvatar",
];

export default function OnboardingScreen() {
  return router.replace(ONBOARDING_STEPS[0] as RelativePathString);
}

export const onboardingStyles = StyleSheet.create({
  bodyContainer: { flexDirection: "column", gap: 24, flex: 1 },
  stepOneNextContainer: {
    justifyContent: "flex-end",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    marginTop: 10,
  },
  background: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  highlightedTitleText: {
    marginBottom: 15,
    paddingTop: 10,
  },
});
