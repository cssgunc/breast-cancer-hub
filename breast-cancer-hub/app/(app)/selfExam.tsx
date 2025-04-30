import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  useWindowDimensions,
  ScaledSize,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { getSetting, SettingsMap } from "@/hooks/useSettings";
import { useState, useEffect } from "react";
import StepIndicators from "@/components/StepIndicators";
import { useColors } from "@/components/ColorContext";
import { useTranslation } from "react-i18next";

const instructions_f = [
    {
      id: 1,
      key:  "CHECK_IN_MIRROR_F",
      image: require("../../assets/images/FEMALE ART 1.jpg"),
    },
    {
      id: 2,
      key: "CHECK_NIPPLES_F",
      image: require("../../assets/images/FEMALE ART 2.jpg"),
    },
    {
      id: 3,
      key: "SITTING_STANDING_F",
      image: require("../../assets/images/FEMALE ART 3.jpg"),
    },
    {
      id: 4,
      key: "COLLARBONE_F",
      image: require("../../assets/images/FEMALE ART 4.jpg"),
    },
    {
      id: 5,
      key: "IN_BED_F",
      image: require("../../assets/images/FEMALE ART 5.png"),
    },
  ];

  const instructions_m = [
    {
      id: 1,
      key: "CHECK_IN_MIRROR_M",
      image: require("../../assets/images/MALE ART 1.jpg"),
    },
    {
      id: 2,
      key: "CHECK_NIPPLES_M",
      image: require("../../assets/images/MALE ART 2.jpg"),
    },
    {
      id: 3,
      key: "SITTING_STANDING_M",
      image: require("../../assets/images/MALE ART 3.jpg"),
    },
    {
      id: 4,
      key: "COLLARBONE_M",
      image: require("../../assets/images/MALE ART 4.jpg"),
    },
    {
      id: 5,
      key: "IN_BED_M",
      image: require("../../assets/images/MALE ART 5.png"),
    },
  ];

export default function HomeScreen() {
  const router = useRouter();

  const {colors, globalStyles} = useColors();
  const { t } = useTranslation();
  
  const [instructions, setInstructions] = useState([
    { id: 1, key: "", image: require("../../assets/images/BCH ribbon.png") },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);

  const [id, setId] = useState({ userId: ""});

  const mapStepToIndex = (step: number) => {
    return (step > 4) ? step - 2 : step;
  }

  useEffect(() => {
    getSetting("userId").then((userId) => {
      setId({ userId});
    })
    const getType = async () => {
      const schedulingType = await getSetting(`${id.userId}_schedulingType` as keyof SettingsMap);
      setExamTypeF(schedulingType == "period");
      setInstructions(await getSetting("avatar") ? instructions_m : instructions_f);
      console.log(instructions);
      console.log(instructions[0].image);
      setIsLoading(false);
    };

    getType();
  }, []);

  const next = () => {
    if (currentStep == 5) {
      router.replace("./selfExamChecklist");
    } else {
      // advance step
      setCurrentStep(currentStep + 1);
    }
  };

  const back = () => {
    if (currentStep == 0) {
      router.back();

    } else {
      // advance step
      setCurrentStep(currentStep - 1);
    }
  };

  var dim : ScaledSize = useWindowDimensions();
  var windowWidth = dim.width;
  var windowHeight = dim.height;

  const [imageSize, setImageSize] = useState(
    Math.round((Math.min(windowWidth, windowHeight) * 1) / 3)
  );

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "auto",
      padding: 10,
      gap: 8,
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
      color: colors.black,
      fontSize: 16,
      fontWeight: "bold",
      paddingTop: 10,
      textAlign: "center",
    },
    imageContainer: {
      padding: 10,
      borderWidth: 3,
      borderColor: colors.black,
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
    },
    buttonBack: {
      margin: 20,
    },
    buttonNext: {
      margin: 20,
    },
  });

  if (isLoading) {
    console.log(instructions[0].image);
    return (
      <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
        <AccountSettingsHeaderComponent />

        <ThemedView style={[globalStyles.whiteOverlay, styles.whiteOverlay]}>
          <ThemedView style={styles.imageContainer}>
            <Image
              source={instructions[0].image}
              style={{ height: imageSize, width: imageSize, borderWidth: 0 }}
            ></Image>
          </ThemedView>

          <ThemedText style={styles.instructionText}>
            {t(instructions[0].key)}
          </ThemedText>

          <ThemedView style={[globalStyles.buttonBackNextContainer, styles.buttonContainer]}>
            <TouchableOpacity style={[globalStyles.buttonBack, styles.buttonBack]} onPress={back}>
              <ThemedText style={globalStyles.buttonTextBack}>Back</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.buttonNext, styles.buttonNext]} onPress={next}>
              <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
      <AccountSettingsHeaderComponent />

      <ScrollView contentContainerStyle={globalStyles.scrollContent}>
        <ThemedView style={[globalStyles.whiteOverlay, styles.whiteOverlay]}>
          {/* Image container */}
          <ThemedView style={styles.imageContainer}>
            <ThemedText></ThemedText>
            <Image
              source={instructions[mapStepToIndex(currentStep)].image}
              style={{ height: imageSize, width: imageSize, borderWidth: 0 }}
            ></Image>

          </ThemedView>
          {/* Text container */}
          <ThemedView style={styles.textContainer}>
            <Text style={styles.instructionText}>
              {t(instructions[mapStepToIndex(currentStep)].key)}
            </Text>
          </ThemedView>

          <ThemedView style={{flexDirection: 'column', alignContent: 'flex-end', marginTop: 'auto'}}>

            <StepIndicators totalSteps={6} currentStep={currentStep}/>

            <ThemedView style={[globalStyles.buttonBackNextContainer, styles.buttonContainer]}>
              <TouchableOpacity style={[globalStyles.buttonBack, styles.buttonBack]} onPress={back}>
                <ThemedText style={globalStyles.buttonTextBack}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.buttonNext, styles.buttonNext]} onPress={next}>
                <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>

          </ThemedView>

        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}