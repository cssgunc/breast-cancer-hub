import {
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
  ScaledSize,
} from "react-native";

import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import AccountSettingsHeaderComponent from "@/components/navigation/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { useState, useEffect } from "react";
import StepIndicators from "@/components/StepIndicators";
import { useColors } from "@/components/style/ColorContext";
import { useTranslation } from "react-i18next";
import ThemedButton from "@/components/ThemedButton";
import LoadingScreen from "@/components/Loading";

const instructions_f = [
  {
    id: 1,
    key: "CHECK_IN_MIRROR_F",
    image: require("@/assets/images/FEMALE ART 1.jpg"),
  },
  {
    id: 2,
    key: "CHECK_NIPPLES_F",
    image: require("@/assets/images/FEMALE ART 2.jpg"),
  },
  {
    id: 3,
    key: "SITTING_STANDING_F",
    image: require("@/assets/images/FEMALE ART 3.jpg"),
  },
  {
    id: 4,
    key: "COLLARBONE_F",
    image: require("@/assets/images/FEMALE ART 4.jpg"),
  },
  {
    id: 5,
    key: "IN_BED_F",
    image: require("@/assets/images/FEMALE ART 5.png"),
  },
];

const instructions_m = [
  {
    id: 1,
    key: "CHECK_IN_MIRROR_M",
    image: require("@/assets/images/MALE ART 1.jpg"),
  },
  {
    id: 2,
    key: "CHECK_NIPPLES_M",
    image: require("@/assets/images/MALE ART 2.jpg"),
  },
  {
    id: 3,
    key: "SITTING_STANDING_M",
    image: require("@/assets/images/MALE ART 3.jpg"),
  },
  {
    id: 4,
    key: "COLLARBONE_M",
    image: require("@/assets/images/MALE ART 4.jpg"),
  },
  {
    id: 5,
    key: "IN_BED_M",
    image: require("@/assets/images/MALE ART 5.png"),
  },
];

export default function SelfExam() {
  const router = useRouter();

  const { colors, globalStyles } = useColors();
  const { t } = useTranslation();

  const [instructions, setInstructions] = useState([
    { id: 1, key: "", image: require("@/assets/images/BCH ribbon.png") },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);

  const mapStepToIndex = (step: number) => {
    return step > 4 ? step - 2 : step;
  };

  useEffect(() => {
    const getType = async () => {
      const examTypeM = await getSetting("avatar");
      setExamTypeF(!examTypeM);
      setInstructions(
        (await getSetting("avatar")) ? instructions_m : instructions_f
      );
      await new Promise((r) => setTimeout(r, 300));
      setIsLoading(false);
    };

    getType();
  }, []);

  const next = () => {
    if (currentStep === 5) {
      router.replace("/selfExam/checklist");
    } else {
      // advance step
      setCurrentStep(currentStep + 1);
    }
  };

  const back = () => {
    if (currentStep === 0) {
      router.back();
    } else {
      // advance step
      setCurrentStep(currentStep - 1);
    }
  };

  var dim: ScaledSize = useWindowDimensions();
  var windowWidth = dim.width;
  var windowHeight = dim.height;

  const [imageSize, setImageSize] = useState(
    Math.round((Math.min(windowWidth, windowHeight) * 1) / 3)
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemedView
      bgColor={colors.darkHighlight}
      style={globalStyles.bodyContainer}
    >
      <AccountSettingsHeaderComponent />

      <ScrollView contentContainerStyle={globalStyles.scrollContent}>
        <ThemedView
          style={[globalStyles.whiteOverlay, selfExamStyles.whiteOverlay]}
        >
          {/* Image container */}
          <ThemedView style={selfExamStyles.imageContainer}>
            <ThemedText></ThemedText>
            <Image
              source={instructions[mapStepToIndex(currentStep)].image}
              style={{ height: imageSize, width: imageSize, borderWidth: 0 }}
            ></Image>
          </ThemedView>
          {/* Text container */}
          <ThemedView style={selfExamStyles.textContainer}>
            <ThemedText bold style={selfExamStyles.instructionText}>
              {t(instructions[mapStepToIndex(currentStep)].key)}
            </ThemedText>
          </ThemedView>

          <ThemedView
            style={{
              flexDirection: "column",
              alignContent: "flex-end",
              marginTop: "auto",
            }}
          >
            <StepIndicators
              totalSteps={6}
              currentStep={currentStep}
              onStepPressed={() => {}}
            />

            <ThemedView
              style={[
                globalStyles.buttonBackNextContainer,
                selfExamStyles.buttonContainer,
              ]}
            >
              <ThemedButton variant="secondary" onPress={back}>
                Back
              </ThemedButton>
              <ThemedButton onPress={next}>Next</ThemedButton>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

export const selfExamStyles = StyleSheet.create({
  titleText: {
    marginBottom: 15,
    paddingTop: 10,
  },
  bodyContainer: {
    flexDirection: "column",
    height: "100%",
    margin: 10,
  },
  whiteOverlay: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  instructionText: {
    paddingTop: 10,
    textAlign: "center",
  },
  imageContainer: {
    padding: 10,
    borderWidth: 3,
    borderColor: "black",
    width: "60%",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    alignItems: "center",
    flexDirection: "column",
  },
  textContainer: {
    padding: 10,
    borderWidth: 0,
    width: "60%",
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: "auto",
    gap: 16,
    padding: 16,
  },
});
