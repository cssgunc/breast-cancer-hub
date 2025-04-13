import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  ScrollView,
  ImageSourcePropType,
  useWindowDimensions,
  ScaledSize,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router, useRouter } from "expo-router";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { useState, useEffect } from "react";
import { colors, globalStyles } from "@/components/StyleSheet";
import StepIndicators from "@/components/StepIndicators";

interface instruction {
  id: number,
  text: string,
  image: any,
}

const instructions_f : instruction[] = [
  {
    id: 1,
    text: "Check your breasts in front of a mirror for any symptoms or abnormalities.",
    image: require("../assets/images/FEMALE ART 1.jpg"),
  },
  {
    id: 2,
    text: "Check your nipples carefully. Lumps may be found behind the nipple.",
    image: require("../assets/images/FEMALE ART 2.jpg"),
  },
  {
    id: 3,
    text: "In a sitting or standing position, use the pads of the three middle fingers. Examine using light, medium, and deep pressure. See next step.",
    image: require("../assets/images/FEMALE ART 3.jpg"),
  },
  {
    id: 4,
    text: "Examining starts at the collarbone and continues down and up the entire breast in a vertical pattern.",
    image: require("../assets/images/FEMALE ART 4.jpg"),
  },
  {
    id: 5,
    text: "Lie down, face up, which leads to a more even distribution of your breast tissue. Repeat step 3 and 4.",
    image: require("../assets/images/FEMALE ART 5.png"),
  },
  {
    id: 6,
    text: "While lying face up, use the pads of the three middle fingers. Examine using light, medium, and deep pressure. See next step.",
    image: require("../assets/images/FEMALE ART 3.jpg"),
  },
  {
    id: 7,
    text: "Examining starts at the collarbone and continues down and up the entire breast in a vertical pattern.",
    image: require("../assets/images/FEMALE ART 4.jpg"),
  },
];

const instructions_m : instruction[] = [
  {
    id: 1,
    text: "Check your breasts in front of a mirror for any symptoms or abnormalities.",
    image: require("../assets/images/MALE ART 1.jpg"),
  },
  {
    id: 2,
    text: "Examine the nipple. Most men find their lumps under the nipple.",
    image: require("../assets/images/MALE ART 2.jpg"),
  },
  {
    id: 3,
    text: "In a sitting or standing position, use the pads of the three middle fingers. Examine using light, medium, and deep pressure. See next step.",
    image: require("../assets/images/MALE ART 3.jpg"),
  },
  {
    id: 4,
    text: "Examining starts at the collarbone and continues down and up the entire breast in a vertical pattern.",
    image: require("../assets/images/MALE ART 4.jpg"),
  },
  {
    id: 5,
    text: "Lie down, face up, which leads to a more even distribution of your breast tissue. Repeat step 3 and 4.",
    image: require("../assets/images/MALE ART 5.png"),
  },
  {
    id: 6,
    text: "While lying face up, use the pads of the three middle fingers. Examine using light, medium, and deep pressure. See next step.",
    image: require("../assets/images/MALE ART 3.jpg"),
  },
  {
    id: 7,
    text: "Examining starts at the collarbone and continues down and up the entire breast in a vertical pattern.",
    image: require("../assets/images/MALE ART 4.jpg"),
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const [instructions, setInstructions] = useState([
    { id: 1, text: "", image: require("../assets/images/BCH ribbon.png") },
  ]);

  // const [usedInstructions, setUsedInstructions] = useState({id: 1, text: "", image: require('../assets/images/BCH ribbon.png')})

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting("schedulingType");
      setExamTypeF(schedulingType == "period");
      setInstructions(examTypeF ? instructions_f : instructions_m);
      console.log(instructions);
      console.log(instructions[0].image);
      setIsLoading(false);
    };

    getType();

    // const handleResize = () => {
    //   setImageSize(
    //     Math.round((Math.min(window.innerWidth, window.innerHeight) * 1) / 3)
    //   );
    // };

    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  const next = () => {
    if (currentStep == 6) {
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
            {instructions[0].text}
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
            {/* <Image
              source={instructions[currentStep].image}
              style={{ height: imageSize, width: imageSize, borderWidth: 0 }}
            ></Image> */}
            {instructions.map((instruction, index) => (
              index == currentStep && (
                <Image
                  key={index}
                  source={instructions[index].image}
                  style={{ height: imageSize, width: imageSize, borderWidth: 0 }}
                ></Image>
              )
            ))
          }
          </ThemedView>
          {/* Text container */}
          <ThemedView style={styles.textContainer}>
            <Text style={styles.instructionText}>
              {instructions[currentStep].text}
            </Text>
          </ThemedView>

        


          <ThemedView style={{flexDirection: 'column', alignContent: 'flex-end', marginTop: 'auto'}}>

            <StepIndicators totalSteps={7} currentStep={currentStep}/>

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
