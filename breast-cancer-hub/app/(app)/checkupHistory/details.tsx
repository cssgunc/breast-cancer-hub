import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import AccountSettingsHeaderComponent from "@/components/navigation/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";
import { useTranslation } from "react-i18next";

export default function CheckupDetails() {
  const router = useRouter();
  const { colors, globalStyles } = useColors();
  const { t, i18n } = useTranslation();

  const { date, symptoms } = useLocalSearchParams<{
    date: string;
    symptoms: string[];
  }>();

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
  const [locale, setLocale] = useState("en-US");
  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  useEffect(() => {
    const getType = async () => {
      const examTypeM = await getSetting("avatar");
      setExamTypeF(!examTypeM);
      const storedLanguageCode = await getSetting("locale");
      await setLocale(storedLanguageCode);
      if (storedLanguageCode && i18n.language !== storedLanguageCode) {
        await i18n.changeLanguage(storedLanguageCode);
      }
      await setSelectedSymptoms(
        symptoms.length === 0 ? ["SYMPTOMS_NONE"] : symptoms
      );
      setIsLoading(false);
    };
    getType();
  }, []);

  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
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
        <ThemedText type="title" colored style={styles.titleText}>
          Checkup History
        </ThemedText>
        <ThemedText type="heading">{formatDate(date)}</ThemedText>

        <ThemedView style={globalStyles.grayLine} />

        <ThemedView bgColor={colors.white} style={globalStyles.bodyContainer}>
          <ScrollView contentContainerStyle={globalStyles.scrollContent}>
            <ThemedView style={[globalStyles.whiteOverlay, { paddingTop: 0 }]}>
              {/* Info Section */}
              <ThemedText type="heading">Symptoms Logged</ThemedText>
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
                    {info_f.map((item) => (
                      <ThemedView
                        key={item.id}
                        style={[
                          globalStyles.listItemContainer,
                          styles.listItemContainer,
                        ]}
                      >
                        <ThemedText style={styles.instructionText}>
                          {t(item.key)}
                        </ThemedText>
                        <View style={styles.checkBoxContainer}>
                          <CheckBox
                            value={selectedSymptoms.includes(item.key)}
                            disabled
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
                        <ThemedText style={styles.instructionText}>
                          {item.key}
                        </ThemedText>
                        <View style={styles.checkBoxContainer}>
                          <CheckBox
                            value={selectedSymptoms.includes(item.key)}
                            disabled
                          />
                        </View>
                      </ThemedView>
                    ))}
                  </ThemedView>
                )}
              </ThemedView>

              {/* Navigation Buttons */}
              <ThemedView style={globalStyles.buttonBackNextContainer}>
                <ThemedButton onPress={() => router.push("./")}>
                  Back
                </ThemedButton>
              </ThemedView>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 15,
    paddingTop: 10,
  },
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
