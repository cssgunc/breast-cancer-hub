import { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import AccountSettingsHeaderComponent from "@/components/navigation/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { useColors } from "@/components/style/ColorContext";
import { useTranslation } from "react-i18next";
import LoadingScreen from "@/components/Loading";
import ThemedButton from "@/components/ThemedButton";
import SelectLanguagePicker from "../settings/(components)/SelectLanguagePicker";

export const ONBOARDING_INFO_STEPS = [
  "/onboarding/breastCancerIntro",
  "/onboarding/purposeOfSelfExam",
  "/onboarding/screeningAndTechniques",
  "/onboarding/additionalInfo",
];

export default function SelfExamInfo() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors, globalStyles } = useColors();

  // Show info reminder when starting a new self-exam
  const params = useLocalSearchParams();
  const [showModal, setShowModal] = useState(params.fromOnboarding !== "1");

  const handleOnboarding = () => {
    router.replace({
      pathname: "/onboarding/breastCancerIntro",
      params: { fromSelfExam: "1" },
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const info_f = [
    { id: 0, key: "SYMPTOMS_SWELLING_F" },
    { id: 1, key: "SYMPTOMS_IRRITATION_DIMPLING_F" },
    { id: 2, key: "SYMPTOMS_PAIN_F" },
    { id: 3, key: "SYMPTOMS_RETRACTION_F" },
    { id: 4, key: "SYMPTOMS_REDNESS_TEXTURE_CHANGES_F" },
    { id: 5, key: "SYMPTOMS_DISCHARGE_F" },
    { id: 6, key: "SYMPTOMS_PAINFUL_PAINLESS_LUMP_F_M" },
  ];
  const info_m = [
    { id: 0, key: "SYMPTOMS_LUMP_THICKENING_M" },
    { id: 1, key: "SYMPTOMS_SKIN_CHANGES_M" },
    { id: 2, key: "SYMPTOMS_NIPPLE_CHANGES_M" },
    { id: 3, key: "SYMPTOMS_DISCHARGE_M" },
    { id: 4, key: "SYMPTOMS_PAINFUL_PAINLESS_LUMP_F_M" },
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
      await new Promise((r) => setTimeout(r, 300));
      setIsLoading(false);
    };

    getType();
  }, [t]);

  const styles = StyleSheet.create({
    titleTextDarkHighlight: {
      paddingTop: 10,
    },
  });

  if (isLoading === true) {
    return <LoadingScreen />;
  } else {
    return (
      <ThemedView
        bgColor={colors.darkHighlight}
        style={globalStyles.bodyContainer}
      >
        {/* Modal for onboarding prompt */}
        <Modal visible={showModal} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 24,
                alignItems: "center",
                width: "80%",
              }}
            >
              <ThemedText type="title" style={{ marginBottom: 12 }}>
                Review Educational Info?
              </ThemedText>
              <ThemedText style={{ marginBottom: 24, textAlign: "center" }}>
                Would you like to review educational information about breast
                cancer before starting your self-exam?
              </ThemedText>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <ThemedButton onPress={handleOnboarding}>Yes</ThemedButton>
                <ThemedButton variant="secondary" onPress={handleCloseModal}>
                  No
                </ThemedButton>
              </View>
            </View>
          </View>
        </Modal>

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
              <SelectLanguagePicker />
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
            <ThemedButton
              variant="secondary"
              onPress={() => {
                router.dismissAll();
                router.replace("/home");
              }}
            >
              Back
            </ThemedButton>
            <ThemedButton onPress={() => router.push("/selfExam")}>
              Next
            </ThemedButton>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  }
}
