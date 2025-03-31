import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { getSetting } from "../../hooks/useSettings";
import { LearnMoreTextContainer } from "../../components/LearnMoreText";
import { colors, globalStyles } from "@/components/StyleSheet";

export default function SelfExamInfo() {
  const router = useRouter();

  const info_f = [
    { id: 1, text: "Swelling of part or all of a breast." },
    {
      id: 2,
      text: "Skin irritation or dimpling (sometimes looking like an orange peel)",
    },
    { id: 3, text: "Breast or nipple pain." },
    { id: 4, text: "Nipple retraction (turning inward)" },
    {
      id: 5,
      text: "Redness, scaliness, or thickening of the nipples or breast skin",
    },
    { id: 6, text: "Nipple discharge (other than breast milk)" },
  ];
  const info_m = [
    { id: 1, text: "A painless lump or thickening in your breast tissue." },
    {
      id: 2,
      text: "Changes to the skin covering your breast, such as dimpling, wrinkling, redness, or scaling.",
    },
    {
      id: 3,
      text: "Changes to your nipple, such as redness or scaling, or a nipple that begins to turn inward.",
    },
    { id: 4, text: "Discharge from your nipple." },
  ];

  const [info, setInfo] = useState([
    { id: 1, text: "Loading signs and symptoms... " },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting("schedulingType");
      setExamTypeF(schedulingType == "period");
      setInfo(examTypeF ? info_f : info_m);
      setIsLoading(false);
    };

    getType();
  }, []);

  if (isLoading == true) {
    return (
      <ThemedView style={globalStyles.bodyContainerDarkPink}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText style={[globalStyles.titleTextDarkPink, styles.titleTextDarkPink]}>
            Before You Begin
          </ThemedText>
          <ThemedText style={styles.titleText}>Things to Look For</ThemedText>

          <ThemedView style={globalStyles.grayLine} />
        </ThemedView>

        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={globalStyles.listTitleTextExam}>
              Signs and Symptoms
            </ThemedText>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={globalStyles.buttonBackNextContainer}>
              <TouchableOpacity
                style={globalStyles.buttonBack}
                onPress={() => router.back()}
              >
                <ThemedText style={globalStyles.buttonTextBack}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.buttonNext}
                onPress={() => router.push("/selfExam")}
              >
                <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  } else {
    return (
      <ThemedView style={globalStyles.bodyContainerDarkPink}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText style={[globalStyles.titleTextDarkPink, styles.titleTextDarkPink]}>
            Before You Begin
          </ThemedText>
          <ThemedText style={[globalStyles.titleText, styles.titleText]}>Things to Look For</ThemedText>

          <ThemedView style={globalStyles.grayLine} />
        </ThemedView>

        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={globalStyles.listTitleTextExam}>
              Signs and Symptoms
            </ThemedText>
            <ThemedView style={globalStyles.listContainer}>
              {info.map((item: { id: number; text: string }) => (
                <ThemedView key={item.id} style={globalStyles.listItemContainer}>
                  <ThemedText style={styles.instructionTextBold}>
                    {item.id + "."}
                  </ThemedText>
                  <ThemedText style={styles.instructionText}>
                    {item.text}
                  </ThemedText>
                </ThemedView>
              ))}
            </ThemedView>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={globalStyles.buttonBackNextContainer}>
              <TouchableOpacity
                style={globalStyles.buttonBack}
                onPress={() => router.back()}
              >
                <ThemedText style={globalStyles.buttonTextBack}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.buttonNext}
                onPress={() => router.push("/selfExam")}
              >
                <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    paddingTop: 25,
  },
  titleTextDarkPink: {
    marginBottom: 15,
    paddingTop: 10,
  },
  instructionTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkPink,
  },
  instructionText: {
    fontSize: 16,
    color: colors.mediumGray,
  },
});
