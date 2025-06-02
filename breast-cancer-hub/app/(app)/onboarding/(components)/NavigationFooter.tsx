import { useRouter, RelativePathString } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { useColors } from "@/components/style/ColorContext";
import StepIndicators from "@/components/StepIndicators";
import { usePathname } from "expo-router";
import ThemedButton from "@/components/ThemedButton";

interface NavigationFooterProps {
  stepRoutes: string[];
  finishRoute: string | { pathname: string; params?: Record<string, string> };
}

export default function NavigationFooter({
  stepRoutes,
  finishRoute,
}: NavigationFooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { globalStyles } = useColors();

  const fullSteps = stepRoutes;

  const idx = fullSteps.indexOf(pathname);
  const current = idx >= 0 ? idx : 0;
  const isFirst = idx <= 0;
  const isLast = idx === fullSteps.length - 1;

  const goForward = () => {
    const next = isLast ? finishRoute : fullSteps[current + 1];
    router.push(next as RelativePathString);
  };
  const goBack = () => {
    if (!isFirst) router.push(fullSteps[current - 1] as RelativePathString);
  };

  const goTo = (step: number) => {
    router.push(fullSteps[step] as RelativePathString);
  };

  return (
    <ThemedView style={styles.containerStyle}>
      <StepIndicators
        currentStep={idx}
        totalSteps={stepRoutes.length}
        onStepPressed={goTo}
      />
      <ThemedView style={globalStyles.buttonBackNextContainer}>
        {!isFirst && (
          <ThemedButton variant="secondary" onPress={() => goBack()}>
            Back
          </ThemedButton>
        )}
        <ThemedButton
          style={{ marginLeft: "auto" }}
          onPress={() => goForward()}
        >
          {isLast ? "Finish" : "Next"}
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
