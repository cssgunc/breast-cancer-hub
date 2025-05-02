import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import SelectLanguage from "../../settings/(components)/SelectLanguage";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";

export default function ChooseLanguage() {
  const { colors, globalStyles } = useColors();
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
        <SelectLanguage />
      </ThemedView>
    </>
  );
}
