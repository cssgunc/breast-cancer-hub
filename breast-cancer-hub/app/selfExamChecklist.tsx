import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import CheckBox from "expo-checkbox";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { getSetting } from "../hooks/useSettings";
import { LearnMoreTextContainer } from "../components/LearnMoreText";
import { colors, globalStyles } from "@/components/StyleSheet";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();


  const info_f = [
    { id: 0, key: "SIGNS_SYMPTOMS_1_F" },
    { id: 1, key: "SIGNS_SYMPTOMS_2_F" },
    { id: 2, key: "SIGNS_SYMPTOMS_3_F" },
    { id: 3, key: "SIGNS_SYMPTOMS_4_F" },
    { id: 4, key: "SIGNS_SYMPTOMS_5_F" },
    { id: 5, key: "SIGNS_SYMPTOMS_6_F" },
    { id: 6, key: "PAINFUL_PAINLESS_SYMPTOMS_F_M" },
  ];
  const info_m = [
    { id: 0, key: "SIGNS_SYMPTOMS_1_M" },
    { id: 1, key: "SIGNS_SYMPTOMS_2_M" },
    { id: 2, key: "SIGNS_SYMPTOMS_3_M" },
    { id: 3, key: "SIGNS_SYMPTOMS_4_M" },
    { id: 4, key: "PAINFUL_PAINLESS_SYMPTOMS_F_M" },
  ];

  const [isSelected, setSelection] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const toggleCheckbox = (index: number, value: boolean) => {
    const newSelection = [...isSelected];
    newSelection[index] = value;
    setSelection(newSelection);
  };

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  // const logSelection = () => {
  //   console.log(isSelected);
  //   console.log(examTypeF);
  // }

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting("schedulingType");
      setExamTypeF(schedulingType === "period");
      const LANGUAGE_KEY = "@app_language";
      const storedLanguageCode = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLanguageCode && i18n.language !== storedLanguageCode) {
        await i18n.changeLanguage(storedLanguageCode);
      }
      setIsLoading(false);
    };

    getType();
  }, []);

  return (
    <ThemedView style={globalStyles.bodyContainerDarkPink}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={globalStyles.whiteOverlay}>
        <ThemedText style={[globalStyles.titleTextDarkPink, styles.titleTextDarkPink]}>
          Log Your Symptoms
        </ThemedText>
        <ThemedText style={globalStyles.listTitleTextExam}>Check All That Apply</ThemedText>

        <ThemedView style={globalStyles.grayLine} />

        {/* Debug button */}
        {/* <TouchableOpacity style={styles.buttonBack} onPress={() => logSelection()}>
          <ThemedText style={styles.buttonTextBack}>log</ThemedText>
        </TouchableOpacity> */}
      </ThemedView>
      
      <ThemedView style={globalStyles.bodyContainerWhite}>
        <ScrollView contentContainerStyle={[globalStyles.scrollContent, {paddingTop: 0}]}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={[globalStyles.listTitleTextExam, styles.listTitleTextExam]}>
              What did you notice?
            </ThemedText>

            {!isLoading && (<ThemedView style={[globalStyles.elevatedBox, {paddingVertical: 0}]}>
                {examTypeF ? (
                  <ThemedView style={[globalStyles.listContainer, styles.listContainer]}>
                    {info_f.map((item: { id: number; key: string }) => (
                      <ThemedView key={item.id} style={[globalStyles.listItemContainer, styles.listItemContainer]}>
                        <ThemedText style={styles.instructionText}>
                          {t(item.key)}
                        </ThemedText>
                        <View style={styles.checkBoxContainer}>
                          <CheckBox
                            value={isSelected[item.id]}
                            onValueChange={(value) => {
                              toggleCheckbox(item.id, value);
                            }}
                          />
                        </View>
                      </ThemedView>
                    ))}
                  </ThemedView>
                ) : (
                  <ThemedView style={[globalStyles.listContainer, styles.listContainer]}>
                    {info_m.map((item: { id: number; key: string }) => (
                      <ThemedView key={item.id} style={[globalStyles.listItemContainer, styles.listItemContainer]}>
                        <ThemedText style={styles.instructionText}>
                          {t(item.key)}
                        </ThemedText>
                        <View style={styles.checkBoxContainer}>
                          <CheckBox
                            key={item.id}
                            value={isSelected[item.id]}
                            onValueChange={(value) => {
                              toggleCheckbox(item.id, value);
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

            {/* Navigation Buttons */}
            <ThemedView style={globalStyles.buttonBackNextContainer}>
              <TouchableOpacity
                style={globalStyles.buttonBack}
                onPress={() => router.replace("./selfExam")}
              >
                <ThemedText style={globalStyles.buttonTextBack}>
                  Back to Exam
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.buttonNext}
                onPress={() =>
                  router.push({
                    pathname: "/selfExamNextSteps",
                    params: {
                      symptoms: isSelected
                        .map((value) => (value ? 1 : 0))
                        .toString(),
                    },
                  })
                }
              >
                <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleTextDarkPink: {
    marginBottom: 15,
    paddingTop: 10,
  },
  checkBoxContainer: {
    flexDirection: "column",
    justifyContent: "center"
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
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    maxWidth: "80%",
    lineHeight: 20,
  },
  
});
