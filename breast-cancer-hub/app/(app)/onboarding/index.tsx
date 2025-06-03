import { StyleSheet } from "react-native";
import { Redirect, RelativePathString } from "expo-router";

export const ONBOARDING_STEPS = [
  "/onboarding/breastCancerIntro",
  "/onboarding/purposeOfSelfExam",
  "/onboarding/screeningAndTechniques",
  "/onboarding/additionalInfo",
  "/onboarding/chooseLanguage",
  "/onboarding/chooseColorScheme",
  "/onboarding/chooseAvatar",
];

export default function OnboardingScreen() {
  return <Redirect href={ONBOARDING_STEPS[0] as RelativePathString} />;
}

export const onboardingStyles = StyleSheet.create({
  bodyContainer: { flexDirection: "column", gap: 24, flex: 1 },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    marginVertical: 16,
  },
  titleContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignSelf: "flex-start",
  },
});
