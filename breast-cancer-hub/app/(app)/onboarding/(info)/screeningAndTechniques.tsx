import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";

export default function ScreeningAndTechniques() {
  const { colors, globalStyles } = useColors();
  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Breast Cancer</ThemedText>
        <ThemedText type="title" colored bold>
          Screening
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedView style={onboardingStyles.bodyContainer}>
        <ThemedText>
          Screening refers to tests and exams that detect diseases early,
          without symptoms.
        </ThemedText>
        <ThemedText>
          Breast cancer originates in one or both breasts. Early detection
          through regular screening is essential because it enables treatment at
          a stage when the cancer is most manageable, often resulting in less
          aggressive interventions and improved survival rates.
        </ThemedText>
        <ThemedText bold>Screening methods:</ThemedText>
        <ThemedText>
          •{" "}
          <ThemedText italic bold>
            Breast Self-Examination:
          </ThemedText>{" "}
          It is advisable to begin self-exams between the ages of 17 and 18.
          Becoming familiar with the normal appearance and feel of your breast
          tissue can help you identify any changes or abnormalities promptly.
          {"\n\n"}•{" "}
          <ThemedText italic bold>
            Clinical Breast Examination:
          </ThemedText>{" "}
          This involves a physical examination of the breasts performed by a
          qualified healthcare provider.
          {"\n\n"}•{" "}
          <ThemedText italic bold>
            Mammography:
          </ThemedText>{" "}
          Women aged 40 and older should undergo annual mammograms. However, it
          is important to note that mammograms may miss approximately 50% of
          cancers in women with dense breast tissue.
          {"\n\n"}•{" "}
          <ThemedText italic bold>
            Advanced Imaging for Dense Breasts:
          </ThemedText>{" "}
          For women with dense breasts, additional screening methods such as 3-D
          mammography (tomosynthesis), breast MRI, breast ultrasound, or
          molecular breast imaging (MBI) may be recommended.
          {"\n\n"}•{" "}
          <ThemedText italic bold>
            High-Risk Individuals:
          </ThemedText>{" "}
          Those identified as having a high risk for breast cancer should
          consider initiating screening earlier and undergoing more frequent
          evaluations.
        </ThemedText>
        <LearnMoreTextContainer />
      </ThemedView>
    </>
  );
}
