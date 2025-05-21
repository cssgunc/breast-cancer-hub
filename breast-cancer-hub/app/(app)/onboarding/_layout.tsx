import { ScrollView, StyleSheet, View } from "react-native";
import { Slot, useSegments } from "expo-router";
import NavigationFooter from "./(components)/NavigationFooter";
import AccountSettingsHeaderComponent from "../../../components/navigation/AccountSettingsHeader";
import { ONBOARDING_STEPS, onboardingStyles } from ".";
import { useEffect, useRef } from "react";
export default function OnboardingLayout() {
  const scrollViewRef = useRef<ScrollView>(null);
  const segments = useSegments();

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
        finishRoute="/chooseMenstruationStatus"
        stepRoutes={ONBOARDING_STEPS}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
