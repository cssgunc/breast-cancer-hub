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
import AccountSettingsHeaderComponent from "@/app/(app)/settings/(components)/AccountSettingsHeader";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { useColors } from "@/components/style/ColorContext";

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
      paddingVertical: 30,
      flexDirection: "row",
      justifyContent: "flex-start",
      columnGap: 10,
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
    titleText: {
      marginBottom: 15,
      paddingTop: 10,
    },

    checkBoxContainer: {
      flexDirection: "column",
      marginBottom: 20,
      alignContent: "center",
      marginTop: 5,
    },
    instructionTextBold: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    instructionText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.black,
    },
    singleButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
  });

  return (
    <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={styles.whiteOverlay}>
        <ThemedText type="title" colored style={styles.titleText}>
          Based On Your Symptoms
        </ThemedText>
        <ThemedText style={styles.subtitleText}>Recommended actions</ThemedText>

        <ThemedView style={globalStyles.grayLine} />
      </ThemedView>

      <ThemedView style={globalStyles.bodyContainerWhite}>
        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={[styles.whiteOverlay, { paddingVertical: 0 }]}>
            {/* Info Section */}
            {getHasSymptoms(symptoms as string) ? (
              <ThemedView style={styles.whiteOverlay}>
                <ThemedView style={styles.noticeContainer}>
                  <MaterialIcons
                    name="error"
                    size={28}
                    color={colors.darkHighlight}
                  />
                  <ThemedText bold style={styles.instructionTextBold}>
                    Notice!
                  </ThemedText>
                </ThemedView>

                <ThemedView style={globalStyles.elevatedBox}>
                  <ThemedText colored style={styles.instructionTextBold}>
                    A visit to your doctor is recommended based on your
                    assessment.
                  </ThemedText>
                  <ThemedText bold style={styles.instructionTextBold}>
                    But please do not stress. Most of the time, Breast lumps or
                    Breast changes are not Cancer. However, reporting any
                    abnormalities or changes to your healthcare provider is
                    essential.
                  </ThemedText>
                  <ThemedText bold style={styles.instructionTextBold} italic>
                    Early detection improves treatment outcomes and saves lives.
                  </ThemedText>
                </ThemedView>

                <LearnMoreTextContainer />

                {/* Navigation Buttons */}
                <ThemedView style={styles.singleButtonContainer}>
                  {/* UPDATE THIS IF THE CONTACT URL CHANGES */}
                  <TouchableOpacity
                    style={globalStyles.buttonPrimary}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.breastcancerhub.org/new-page-3"
                      )
                    }
                  >
                    <ThemedText style={globalStyles.buttonTextPrimary}>
                      Schedule an appointment
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
                <ThemedView style={styles.singleButtonContainer}>
                  <TouchableOpacity
                    style={globalStyles.buttonPrimary}
                    onPress={() => {
                      router.dismissAll();
                      router.replace("/");
                    }}
                  >
                    <ThemedText style={globalStyles.buttonTextPrimary}>
                      Return Home
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            ) : (
              <ThemedView style={[styles.whiteOverlay, { paddingVertical: 0 }]}>
                <ThemedView style={styles.noticeContainer}>
                  <MaterialIcons
                    name="check-circle"
                    size={28}
                    color={colors.green}
                  />
                  <ThemedText style={styles.instructionTextBold}>
                    You're all good!
                  </ThemedText>
                </ThemedView>

                <ThemedView style={globalStyles.elevatedBox}>
                  <ThemedText style={styles.instructionTextBold}>
                    Please continue to perform your Breast Self-Examination
                    every month.
                  </ThemedText>
                </ThemedView>

                <LearnMoreTextContainer />

                <ThemedView style={styles.singleButtonContainer}>
                  <TouchableOpacity
                    style={globalStyles.buttonPrimary}
                    onPress={() => {
                      router.dismissAll();
                      router.replace("/");
                    }}
                  >
                    <ThemedText style={globalStyles.buttonTextPrimary}>
                      Return Home
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            )}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}
