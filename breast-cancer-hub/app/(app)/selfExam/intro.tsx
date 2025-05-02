import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import AccountSettingsHeaderComponent from "@/components/navigation/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { useColors } from "@/components/style/ColorContext";
import { useTranslation } from "react-i18next";
import LoadingScreen from "@/components/Loading";

export default function SelfExamInfo() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { colors, globalStyles } = useColors();

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

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting("schedulingType");
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
    titleTextDarkHighlight: {
      paddingTop: 10,
    },
  });

  if (isLoading == true) {
    return <LoadingScreen />;
  } else {
    return (
      <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={[globalStyles.whiteOverlay, { paddingBottom: 0 }]}>
          <ThemedText
            type="title"
            colored
            style={styles.titleTextDarkHighlight}
          >
            Before You Begin
          </ThemedText>
          <ThemedText type="heading">Things to Look For</ThemedText>
          <ThemedView style={globalStyles.grayLine} />
          <ScrollView contentContainerStyle={globalStyles.scrollContent}>
            <ThemedView style={[globalStyles.whiteOverlay, { paddingTop: 0 }]}>
              {/* Info Section */}
              <ThemedText type="heading">Signs and Symptoms</ThemedText>
              <ThemedView
                style={[globalStyles.listContainer, { paddingVertical: 10 }]}
              >
                {info.map((item: { id: number; key: string }) => (
                  <ThemedView
                    key={item.id}
                    style={globalStyles.listItemContainer}
                  >
                    <ThemedText type="heading" colored>
                      {item.id + 1 + "."}
                    </ThemedText>
                    <ThemedText type="caption">{t(item.key)}</ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>

              <ThemedText>
                A Painless or Painful Breast Lump or Breast Changes Needs
                Medical Attention. Most of the time, breast lumps are not Cancer
                and are called Benign. Still, it is important to have them
                checked—better Safe than Sorry. Please follow up as recommended
                by your healthcare provider.
              </ThemedText>
              <LearnMoreTextContainer />
            </ThemedView>
          </ScrollView>
          {/* Navigation Buttons */}
          <ThemedView
            style={[
              globalStyles.buttonBackNextContainer,
              { paddingVertical: 16 },
            ]}
          >
            <TouchableOpacity
              style={globalStyles.buttonSecondary}
              onPress={() => {
                router.dismissAll();
                router.replace("/");
              }}
            >
              <ThemedText style={globalStyles.buttonTextSecondary}>
                Back
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={() => router.push("/selfExam")}
            >
              <ThemedText style={globalStyles.buttonTextPrimary}>
                Next
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  }
}
