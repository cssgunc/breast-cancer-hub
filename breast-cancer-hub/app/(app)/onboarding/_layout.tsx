import { ScrollView, StyleSheet, View } from "react-native";
import { Slot, useLocalSearchParams, useSegments } from "expo-router";
import NavigationFooter from "./(components)/NavigationFooter";
import AccountSettingsHeaderComponent from "../../../components/navigation/AccountSettingsHeader";
import { ONBOARDING_STEPS, onboardingStyles } from ".";
import { useEffect, useRef } from "react";
import { ONBOARDING_INFO_STEPS } from "../selfExam/intro";
export default function OnboardingLayout() {
  const scrollViewRef = useRef<ScrollView>(null);
  const segments = useSegments();
  const params = useLocalSearchParams();
  const isInfoOnly = params.fromSelfExam === "1";
  const steps = isInfoOnly ? ONBOARDING_INFO_STEPS : ONBOARDING_STEPS;

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [segments.join("/")]);

  return (
    <View style={styles.container}>
      <AccountSettingsHeaderComponent />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={onboardingStyles.scrollContent}
      >
        <Slot />
      </ScrollView>

      <NavigationFooter
        finishRoute={
          isInfoOnly
            ? { pathname: "/selfExam/intro", params: { fromOnboarding: "1" } }
            : "/chooseMenstruationStatus"
        }
        stepRoutes={steps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
