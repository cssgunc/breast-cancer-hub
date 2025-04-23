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
import { getSetting, SettingsMap } from "../hooks/useSettings";
import { LearnMoreTextContainer } from "../components/LearnMoreText";
import { useCheckupStorage } from "@/hooks/useCheckupStorage";
import { useColors } from "@/components/ColorContext";
import { useTranslation } from "react-i18next";
import { store } from "expo-router/build/global-state/router-store";

export default function HomeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const {colors, globalStyles} = useColors();

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

  const [id, setId] = useState({ userId: ""});

  useEffect(() => {
    getSetting("userId").then((userId) => {
      setId({ userId});
    })
    const getType = async () => {
      const schedulingType = await getSetting(`${id.userId}_schedulingType` as keyof SettingsMap);
      setExamTypeF(schedulingType === "period");
      const storedLanguageCode = await getSetting("locale");
      console.log(storedLanguageCode);
      if (storedLanguageCode && i18n.language !== storedLanguageCode) {
        await i18n.changeLanguage(storedLanguageCode);
      }
      setIsLoading(false);
    };

    getType();
  }, []);

   const styles = StyleSheet.create({
    titleTextDarkHighlight: {
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

  const { saveCheckup } = useCheckupStorage();
  const saveSymptoms = async () => {
    // Save the symptoms to secure storage, store date as ISO 8601 format ("yyyy-mm-dd"), functionality abstracted to hook
    await saveCheckup(isSelected);
  };

    return (
    <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={[globalStyles.whiteOverlay, {paddingBottom: 0}]}>
        <ThemedText style={[globalStyles.titleTextDarkHighlight, styles.titleTextDarkHighlight]}>
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
          <ThemedView style={[globalStyles.whiteOverlay, {paddingTop: 0}]}>
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
                onPress={() =>{
                  saveSymptoms();
                  router.push({
                    pathname: "/selfExamNextSteps",
                    params: {
                      symptoms: isSelected
                        .map((value) => (value ? 1 : 0))
                        .toString(),
                    },
                  })}
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