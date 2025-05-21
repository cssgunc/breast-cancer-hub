import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import SelectLanguage from "../../settings/(components)/SelectLanguage";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";

export default function ChooseLanguage() {
  const { globalStyles } = useColors();
  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Change Your</ThemedText>
        <ThemedText type="title" colored>
          Self-Examination Language
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedView style={onboardingStyles.bodyContainer}>
        <ThemedText type="caption" italic>
          Your language choice affects only the instructions and symptoms text
          during your breast self exam.
        </ThemedText>
        <SelectLanguage />
      </ThemedView>
    </>
  );
}
