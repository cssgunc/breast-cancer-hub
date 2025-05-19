import { useColors } from "@/components/style/ColorContext";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { StyleSheet } from "react-native";
import { onboardingStyles } from "..";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";

export default function PurposeOfSelfExam() {
  const { colors, globalStyles } = useColors();

  const styles = StyleSheet.create({
    quotesContainer: {
      flexDirection: "column",
      marginVertical: 16,
      alignItems: "center",
      gap: 16,
    },
  });
  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">The Purpose of</ThemedText>
        <ThemedText type="title" colored>
          A Self-Exam
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedView style={onboardingStyles.bodyContainer}>
        <ThemedText type="heading" colored>
          Notice:
        </ThemedText>
        <ThemedText>
          A self-exam is not a substitute for annual breast cancer screenings.
          <ThemedText italic bold>
            {" "}
            Mammograms are essential.
          </ThemedText>
        </ThemedText>
        <ThemedText italic>
          The most recent American Cancer Society guidelines recommend women
          ages{" "}
          <ThemedText colored bold>
            40 to 44
          </ThemedText>{" "}
          should consider annual breast cancer screenings with mammograms. Women
          ages{" "}
          <ThemedText colored bold>
            45 to 54
          </ThemedText>{" "}
          should get mammograms every year. Women{" "}
          <ThemedText colored bold>
            55 and older
          </ThemedText>{" "}
          should switch to mammograms every 2 years or continue yearly
          screening.
        </ThemedText>
        <ThemedText>
          But Mammograms may miss half of the Cancers in women with dense
          breasts. Therefore, 3D mammography, also called digital breast
          tomosynthesis, is recommended for everyone. 3D mammography can find more
          cancers, reduce false positives, and allow better detection in
          dense breasts.
        </ThemedText>
        <ThemedText bold>
          Diverse ethnic groups, all genders, and even young people are all
          affected by Breast Cancer. Therefore, it is critical to be familiar
          with how our breasts typically look and feel.
        </ThemedText>
        <ThemedText>
          Please start examining your Breast once a month, from the age of 17-18
          years. If you have your period, we reccomend you check yourself a week after your period begins. For others, check yourself on the same date every month.
          If you have any abnormalities, changes, discharges, painless or painful lump that don’t go away,
          please immediately seek medical advice.
        </ThemedText>
        <ThemedView style={globalStyles.grayLine} />
        <ThemedView style={styles.quotesContainer}>
          <ThemedText italic colored style={{ textAlign: "center" }}>
            “The difference is, this could save your life.”
          </ThemedText>
          <ThemedText italic colored style={{ textAlign: "center" }}>
            “Mammograms are important, self-exams are how you are going to find
            cancer early and save your life.”
          </ThemedText>
          <ThemedText italic colored style={{ textAlign: "center" }}>
            “Early detection is the key.”
          </ThemedText>
          <ThemedText
            type="caption"
            italic
            colored
            style={{ textAlign: "center" }}
          >
            Note: While a breast self-exam is a useful tool for the early
            detection of breast cancer, it should not replace Mammograms and
            Clinical Breast Exams.
          </ThemedText>
        </ThemedView>
        <LearnMoreTextContainer />
      </ThemedView>
    </>
  );
}
