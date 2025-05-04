import { ExternalLink } from "@/components/navigation/ExternalLink";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { TouchableOpacity, StyleSheet } from "react-native";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";

export default function AdditionalInfo() {
  const { colors, globalStyles } = useColors();
  const styles = StyleSheet.create({
    link: {
      marginTop: -24,
      marginBottom: -36,
      lineHeight: 24,
    }
  })
  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Additional Resources &</ThemedText>
        <ThemedText type="title" colored bold>
          Contact Information
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedView style={onboardingStyles.bodyContainer}>
        <ThemedText>
          If you experience any symptoms or require further testing, please
          consult your healthcare provider promptly.
          {"\n\n"}For additional support, you can download the "One-stop
          Lifesaving Early Detection Cards" for other prevalent cancers by
          visiting:
        </ThemedText>
        <ExternalLink
          href="https://www.breastcancerhub.org/educational-cards"
          asChild
        >
          <TouchableOpacity>
            <ThemedText type="link" style={styles.link}>
              https://www.breastcancerhub.org/educational-cards
            </ThemedText>
          </TouchableOpacity>
        </ExternalLink>
        <ThemedText>
          {"\n"}To learn more about our grassroots, sustainable solutions that
          are saving lives globally, please visit:
        </ThemedText>
        <ExternalLink
          href="https://www.breastcancerhub.org"
          asChild
        >
          <TouchableOpacity>
            <ThemedText type="link" style={styles.link}>
              https://www.breastcancerhub.org
            </ThemedText>
          </TouchableOpacity>
        </ExternalLink>
        <ThemedText>
          If you have any questions, please contact Dr. Lopamudra Das
          Roy, Founder-President of Breast Cancer Hub, at
          lopa@breastcancerhub.org.
        </ThemedText>
        <LearnMoreTextContainer />
      </ThemedView>
    </>
  );
}
