import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AccountSettingsHeaderComponent from "@/components/navigation/AccountSettingsHeader";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";
import { selfExamStyles } from ".";

export default function NextStepsScreen() {
  const router = useRouter();
  const { colors, globalStyles } = useColors();

  // NOT TYPE SAFE
  const { symptoms } = useLocalSearchParams();

  const getHasSymptoms = (s: string) => {
    const symptomsArray = s.split(",");
    return symptomsArray.some((symptom) => symptom === "1");
  };

  useEffect(() => {
    console.log(symptoms);
    console.log(symptoms as string);
  }, []);

  const styles = StyleSheet.create({
    noticeContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 16,
    },
    whiteOverlay: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 17,
      borderTopRightRadius: 17,
      padding: 20,
    },
    // Here, the main title is highlighted pink, while the subtitle is black.
    subtitleText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.black,
    },
    checkBoxContainer: {
      flexDirection: "column",
      marginBottom: 20,
      alignContent: "center",
      marginTop: 5,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "auto",
      gap: 16,
    },
  });

  return (
    <ThemedView
      bgColor={colors.darkHighlight}
      style={globalStyles.bodyContainer}
    >
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={[styles.whiteOverlay, { paddingBottom: 0 }]}>
        <ThemedText type="title" colored style={selfExamStyles.titleText}>
          Based On Your Symptoms
        </ThemedText>
        <ThemedText style={styles.subtitleText}>Recommended actions</ThemedText>

        <ThemedView style={globalStyles.grayLine} />

        <ThemedView bgColor={colors.white} style={globalStyles.bodyContainer}>
          <ThemedView style={[styles.whiteOverlay, { paddingTop: 0 }]}>
            {/* Info Section */}
            {getHasSymptoms(symptoms as string) ? (
              <>
                <ThemedView style={styles.noticeContainer}>
                  <MaterialIcons
                    name="error"
                    size={28}
                    color={colors.darkHighlight}
                  />
                  <ThemedText type="heading">Notice!</ThemedText>
                </ThemedView>
                <ThemedView
                  style={[
                    globalStyles.elevatedCard,
                    { flexDirection: "column", gap: 16 },
                  ]}
                >
                  <ThemedText colored type="heading">
                    A visit to your doctor is recommended based on your
                    assessment.
                  </ThemedText>
                  <ThemedText>
                    But please do not stress. Most of the time, Breast lumps or
                    Breast changes are not Cancer. However, reporting any
                    abnormalities or changes to your healthcare provider is
                    essential.
                  </ThemedText>
                  <ThemedText bold italic>
                    Early detection improves treatment outcomes and saves lives.
                  </ThemedText>
                </ThemedView>

                <LearnMoreTextContainer />
              </>
            ) : (
              <ThemedView style={[styles.whiteOverlay, { paddingVertical: 0 }]}>
                <ThemedView style={styles.noticeContainer}>
                  <MaterialIcons
                    name="check-circle"
                    size={28}
                    color={colors.green}
                  />
                  <ThemedText type="heading" bold>
                    You're all good!
                  </ThemedText>
                </ThemedView>

                <ThemedView style={globalStyles.elevatedCard}>
                  <ThemedText type="heading" bold>
                    Please continue to perform your Breast Self-Examination
                    every month.
                  </ThemedText>
                </ThemedView>

                <LearnMoreTextContainer />
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>

        {/* Navigation Buttons */}
        <ThemedView style={styles.buttonContainer}>
          {/* UPDATE THIS IF THE CONTACT URL CHANGES */}
          <ThemedButton
            onPress={() =>
              Linking.openURL("https://www.breastcancerhub.org/new-page-3")
            }
          >
            Contact BCH
          </ThemedButton>
          <ThemedButton
            onPress={() => {
              router.dismissAll();
              router.replace("/");
            }}
          >
            Return Home
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
