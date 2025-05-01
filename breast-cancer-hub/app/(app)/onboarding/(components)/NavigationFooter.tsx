import { useSegments, useRouter, RelativePathString } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useColors } from "@/components/style/ColorContext";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import StepIndicators from "@/components/StepIndicators";
import { usePathname } from "expo-router";

interface NavigationFooterProps {
  stepRoutes: string[];
  finishRoute: string;
}

export default function NavigationFooter({
  stepRoutes,
  finishRoute,
}: NavigationFooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, globalStyles } = useColors();

  const fullSteps = stepRoutes; //.map((r) => (r.startsWith("/") ? r : `/${r}`));

  const idx = fullSteps.indexOf(pathname);
  const current = idx >= 0 ? idx : 0;
  const isFirst = idx <= 0;
  const isLast = idx === fullSteps.length - 1;

  const goForward = () => {
    console.log("current index is" + idx);
    console.log(fullSteps);
    console.log(pathname);
    const next = isLast ? finishRoute : fullSteps[current + 1];
    router.push(next as RelativePathString);
  };
  const goBack = () => {
    if (!isFirst) router.push(fullSteps[current - 1] as RelativePathString);
  };

  const containerStyle = isFirst
    ? styles.buttonStepZeroContainer
    : globalStyles.buttonBackNextContainer;

  return (
    <ThemedView style={styles.containerStyle}>
      <StepIndicators currentStep={idx} totalSteps={stepRoutes.length} />
      <ThemedView style={containerStyle}>
        {!isFirst && (
          <TouchableOpacity
            style={globalStyles.buttonSecondary}
            onPress={() => goBack()}
          >
            <ThemedText style={globalStyles.buttonTextSecondary}>
              Back
            </ThemedText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={globalStyles.buttonPrimary}
          onPress={() => goForward()}
        >
          <ThemedText style={globalStyles.buttonTextPrimary}>
            {isLast ? "Finish" : "Next"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <LearnMoreTextContainer />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  buttonStepZeroContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 10,
    marginRight: 30,
  },
});
