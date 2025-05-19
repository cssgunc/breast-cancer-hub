import { useColors } from "@/components/style/ColorContext";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { StyleSheet } from "react-native";
import { onboardingStyles } from "..";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";

export default function BreastCancerIntro() {
  const { colors, globalStyles } = useColors();

  const styles = StyleSheet.create({
    statContainer: {
      backgroundColor: colors.backgroundLightGray,
      padding: 10,
      borderLeftWidth: 4,
      borderColor: colors.darkHighlight,
      marginVertical: 15,
    },
    statText: {
      marginBottom: 10,
    },
    paragraphTextTitle: {
      marginVertical: 10,
    },
  });

  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title" colored>
          What is Breast Cancer?
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedView style={onboardingStyles.bodyContainer}>
        <ThemedText bold>
          Breast cancer begins as a growth of abnormal cells in the breast
          tissue. If left untreated, it can spread in the body, leading to
          death. Early detection is the key to Saving Lives!
        </ThemedText>
        <ThemedView style={styles.statContainer}>
          <ThemedText type="heading" colored>
            1 in 8 WOMEN
          </ThemedText>
          <ThemedText style={styles.statText}>
            can have{" "}
            <ThemedText bold colored>
              BREAST CANCER
            </ThemedText>{" "}
            in their lifetime, and the incidence is increasing
            worldwide.
          </ThemedText>
        </ThemedView>
        <ThemedText>
          <ThemedText bold colored>
            MEN
          </ThemedText>{" "}
          have Breasts too, but due to lack of awareness,{" "}
          men
          tend to present at advanced stages.
        </ThemedText>
        <ThemedText>
          Unfortunately, the breast cancer death rate is significantly higher in developing
          countries due to taboo and lack of awareness, which leads to late detection.
        </ThemedText>
        <LearnMoreTextContainer />
      </ThemedView>
    </>
  );
}
