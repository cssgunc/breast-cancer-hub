import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CheckBox from "expo-checkbox";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import AccountSettingsHeaderComponent from "@/components/navigation/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { useCheckupData } from "@/hooks/CheckupContext";
import { useColors } from "@/components/style/ColorContext";
import { useTranslation } from "react-i18next";
import ThemedButton from "@/components/ThemedButton";
import { selfExamStyles } from ".";

export default function Checklist() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { scheduleNextCheckup } = useCheckupData();

  const { colors, globalStyles } = useColors();

  const info_f = [
    { id: 0, key: "SYMPTOMS_SWELLING_F" },
    { id: 1, key: "SYMPTOMS_IRRITATION_DIMPLING_F" },
    { id: 2, key: "SYMPTOMS_PAIN_F" },
    { id: 3, key: "SYMPTOMS_RETRACTION_F" },
    { id: 4, key: "SYMPTOMS_REDNESS_TEXTURE_CHANGES_F" },
    { id: 5, key: "SYMPTOMS_DISCHARGE_F" },
    { id: 6, key: "SYMPTOMS_PAINFUL_PAINLESS_LUMP_F_M" },
    { id: 7, key: "SYMPTOMS_NONE" },
  ];
  const info_m = [
    { id: 0, key: "SYMPTOMS_LUMP_THICKENING_M" },
    { id: 1, key: "SYMPTOMS_SKIN_CHANGES_M" },
    { id: 2, key: "SYMPTOMS_NIPPLE_CHANGES_M" },
    { id: 3, key: "SYMPTOMS_DISCHARGE_M" },
    { id: 4, key: "SYMPTOMS_PAINFUL_PAINLESS_LUMP_F_M" },
    { id: 5, key: "SYMPTOMS_NONE" },
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleCheckbox = (key: string, checked: boolean) => {
    setSelectedSymptoms((prev) => {
      if (checked) {
        if (key === "SYMPTOMS_NONE") {
          return ["SYMPTOMS_NONE"];
        }
        return [...prev.filter((k) => k !== "SYMPTOMS_NONE"), key];
      } else {
        return prev.filter((k) => k !== key);
      }
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  useEffect(() => {
    const getType = async () => {
      const examTypeM = await getSetting("avatar");
      setExamTypeF(!examTypeM);
      const storedLanguageCode = await getSetting("locale");
      if (storedLanguageCode && i18n.language !== storedLanguageCode) {
        await i18n.changeLanguage(storedLanguageCode);
      }
      setIsLoading(false);
    };

    getType();
  }, []);

  const { saveCompletedCheckup } = useCheckupData();
  const saveSymptoms = async () => {
    const toSave = selectedSymptoms.includes("SYMPTOMS_NONE")
      ? []
      : selectedSymptoms;
    await saveCompletedCheckup(toSave);
  };

  const next = async () => {
    await saveSymptoms();
    await scheduleNextCheckup();
    router.push({
      pathname: "/selfExam/nextSteps",
      params: {
        symptoms: JSON.stringify(selectedSymptoms),
      },
    });
  };

  return (
    <ThemedView
      bgColor={colors.darkHighlight}
      style={globalStyles.bodyContainer}
    >
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={[globalStyles.whiteOverlay, { paddingBottom: 0 }]}>
        <ThemedText type="title" colored style={selfExamStyles.titleText}>
          Log Your Symptoms
        </ThemedText>
        <ThemedText type="heading">Check All That Apply</ThemedText>

        <ThemedView style={globalStyles.grayLine} />

        <ThemedView bgColor={colors.white} style={globalStyles.bodyContainer}>
          <ScrollView contentContainerStyle={[globalStyles.scrollContent]}>
            <ThemedView style={[globalStyles.whiteOverlay, { paddingTop: 0 }]}>
              {/* Info Section */}
              <ThemedText type="heading">What did you notice?</ThemedText>

              {!isLoading && (
                <ThemedView
                  style={[
                    globalStyles.elevatedCard,
                    { paddingVertical: 0, marginVertical: 10 },
                  ]}
                >
                  {examTypeF ? (
                    <ThemedView
                      style={[globalStyles.listContainer, styles.listContainer]}
                    >
                      {info_f.map((item: { id: number; key: string }) => (
                        <ThemedView
                          key={item.id}
                          style={[
                            globalStyles.listItemContainer,
                            styles.listItemContainer,
                          ]}
                        >
                          <ThemedText bold style={styles.instructionText}>
                            {t(item.key)}
                          </ThemedText>
                          <View style={styles.checkBoxContainer}>
                            <CheckBox
                              key={item.id}
                              value={selectedSymptoms.includes(item.key)}
                              onValueChange={(value) => {
                                toggleCheckbox(item.key, value);
                              }}
                            />
                          </View>
                        </ThemedView>
                      ))}
                    </ThemedView>
                  ) : (
                    <ThemedView
                      style={[globalStyles.listContainer, styles.listContainer]}
                    >
                      {info_m.map((item: { id: number; key: string }) => (
                        <ThemedView
                          key={item.id}
                          style={[
                            globalStyles.listItemContainer,
                            styles.listItemContainer,
                          ]}
                        >
                          <ThemedText bold style={styles.instructionText}>
                            {t(item.key)}
                          </ThemedText>
                          <View style={styles.checkBoxContainer}>
                            <CheckBox
                              key={item.id}
                              value={selectedSymptoms.includes(item.key)}
                              onValueChange={(value) => {
                                toggleCheckbox(item.key, value);
                              }}
                            />
                          </View>
                        </ThemedView>
                      ))}
                    </ThemedView>
                  )}
                </ThemedView>
              )}
              <LearnMoreTextContainer />
            </ThemedView>
          </ScrollView>
        </ThemedView>
        {/* Navigation Buttons */}
        <ThemedView
          style={[
            globalStyles.buttonBackNextContainer,
            { paddingVertical: 16 },
          ]}
        >
          <ThemedButton
            variant="secondary"
            onPress={() => router.replace("/selfExam")}
          >
            Back to Exam
          </ThemedButton>
          <ThemedButton onPress={next}>Next</ThemedButton>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  radioGroup: {},
  checkBoxContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },

  listTitleTextExam: {
    marginBottom: 10,
  },
  listContainer: {
    backgroundColor: "transparent",
    marginHorizontal: 0,
  },
  listItemContainer: {
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  instructionText: {
    maxWidth: "80%",
  },
});
