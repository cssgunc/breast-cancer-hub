import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { getSetting, SettingsMap } from "../hooks/useSettings";
import { LearnMoreTextContainer } from "../components/LearnMoreText";
import { useColors } from "@/components/ColorContext";
import { useTranslation } from "react-i18next";

export default function SelfExamInfo() {
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

  const [info, setInfo] = useState([
    { id: 1, key: "Loading signs and symptoms... " },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const [id, setId] = useState({ userId: ""});

  useEffect(() => {
    getSetting("userId").then((userId) => {
      setId({ userId});
    })
    const getType = async () => {
      const schedulingType = await getSetting("${id.userId}_schedulingType" as keyof SettingsMap);
      const isF = schedulingType === "period";
  
      const selectedInfo = isF ? info_f : info_m;
      const translatedInfo = selectedInfo.map((item) => ({
        id: item.id,
        key: t(item.key),
      }));
  
      setInfo(translatedInfo);
      setIsLoading(false);
    };
  
    getType();
  }, [t]);

  const styles = StyleSheet.create({
    titleText: {
      fontSize: 24,
    },
    titleTextDarkHighlight: {
      paddingTop: 10,
    },
    instructionTextBold: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.darkHighlight,
    },
    instructionText: {
      fontSize: 16,
      color: colors.mediumGray,
    },
  });

  if (isLoading == true) {
    return (
      <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText style={[globalStyles.titleTextDarkHighlight, styles.titleTextDarkHighlight]}>
            Before You Begin
          </ThemedText>
          <ThemedText style={styles.titleText}>Things to Look For</ThemedText>

          <ThemedView style={globalStyles.grayLine} />
        </ThemedView>

        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={[globalStyles.listTitleTextExam, {paddingBottom: 5}]}>
              Signs and Symptoms
            </ThemedText>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={globalStyles.buttonBackNextContainer}>
              <TouchableOpacity
                style={globalStyles.buttonBack}
                onPress={() => {router.dismissAll(); router.replace("/")}}
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
      <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={[globalStyles.whiteOverlay, {paddingBottom: 0}]}>
          <ThemedText style={[globalStyles.titleTextDarkHighlight, styles.titleTextDarkHighlight]}>
            Before You Begin
          </ThemedText>
          <ThemedText style={[globalStyles.titleText, styles.titleText]}>Things to Look For</ThemedText>

          <ThemedView style={globalStyles.grayLine} />
        </ThemedView>
        
        <ThemedView style={globalStyles.bodyContainerWhite}>
          <ScrollView contentContainerStyle={globalStyles.scrollContent}>
            <ThemedView style={[globalStyles.whiteOverlay, {paddingTop: 0}]}>
              {/* Info Section */}
              <ThemedText style={[globalStyles.listTitleTextExam, {paddingBottom: 5}]}>
                Signs and Symptoms
              </ThemedText>
              <ThemedView style={[globalStyles.listContainer, {paddingVertical: 10}]}>
                {info.map((item: { id: number; key: string }) => (
                  <ThemedView key={item.id} style={globalStyles.listItemContainer}>
                    <ThemedText style={styles.instructionTextBold}>
                      {item.id + 1 + "."}
                    </ThemedText>
                    <ThemedText style={styles.instructionText}>
                      {t(item.key)}
                    </ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>

              <LearnMoreTextContainer />

              {/* Navigation Buttons */}
              <ThemedView style={globalStyles.buttonBackNextContainer}>
                <TouchableOpacity
                  style={globalStyles.buttonBack}
                  onPress={() => {router.dismissAll(); router.replace("/")}}
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
        
      </ThemedView>
    );
  }
}
