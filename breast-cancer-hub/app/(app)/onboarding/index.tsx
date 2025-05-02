import { StyleSheet } from "react-native";
import { Redirect, RelativePathString } from "expo-router";

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
  return <Redirect href={ONBOARDING_STEPS[0] as RelativePathString} />;
}

export const onboardingStyles = StyleSheet.create({
  bodyContainer: { flexDirection: "column", gap: 24, flex: 1 },
  stepOneNextContainer: {
    justifyContent: "flex-end",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    marginVertical: 16,
  },
  background: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignSelf: "flex-start",
  },
});
