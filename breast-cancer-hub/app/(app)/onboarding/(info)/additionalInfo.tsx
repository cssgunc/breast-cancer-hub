import { ExternalLink } from "@/components/navigation/ExternalLink";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { TouchableOpacity } from "react-native";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";

export default function AdditionalInfo() {
  const { colors, globalStyles } = useColors();
  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Additional Resources &</ThemedText>
        <ThemedText
          type="title"
          colored
          bold
          style={onboardingStyles.highlightedTitleText}
        >
          Contact Information
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedText>
        If you experience any symptoms or require further testing, please
        consult your healthcare provider promptly.
        {"\n\n"}For additional support, you can download the "One-stop
        Lifesaving Early Detection Cards" for other prevalent cancers by
        visiting:
        {"\n"}
        <ExternalLink
          href="https://www.breastcancerhub.org/educational-cards"
          asChild
        >
          <TouchableOpacity>
            <ThemedText type="link">
              https://www.breastcancerhub.org/educational-cards
            </ThemedText>
          </TouchableOpacity>
        </ExternalLink>
        {"\n\n"}To learn more about our grassroots, sustainable solutions that
        are saving lives globally, please visit:
        {"\n"}
        <ExternalLink href="https://www.breastcancerhub.org" asChild>
          <TouchableOpacity>
            <ThemedText type="link">https://www.breastcancerhub.org</ThemedText>
          </TouchableOpacity>
        </ExternalLink>
        {"\n\n"}If you have any questions, please contact Dr. Lopamudra Das Roy,
        Founder-President of Breast Cancer Hub, at lopa@breastcancerhub.org.
      </ThemedText>
    </>
  );
}
