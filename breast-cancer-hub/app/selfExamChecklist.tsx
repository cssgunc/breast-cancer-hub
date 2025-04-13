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
import { useColors } from "@/components/ColorContext";

export default function HomeScreen() {
  const router = useRouter();
  const {colors, globalStyles} = useColors();

  const info_f = [
    { id: 0, text: "Swelling of part or all of a breast." },
    {
      id: 1,
      text: "Skin irritation or dimpling (sometimes looking like an orange peel)",
    },
    { id: 2, text: "Breast or nipple pain." },
    { id: 3, text: "Nipple retraction (turning inward)" },
    {
      id: 4,
      text: "Redness, scaliness, or thickening of the nipples or breast skin",
    },
    { id: 5, text: "Nipple discharge (other than breast milk)" },
  ];
  const info_m = [
    { id: 0, text: "A painless lump or thickening in your breast tissue." },
    {
      id: 1,
      text: "Changes to the skin covering your breast, such as dimpling, wrinkling, redness, or scaling.",
    },
    {
      id: 2,
      text: "Changes to your nipple, such as redness or scaling, or a nipple that begins to turn inward.",
    },
    { id: 3, text: "Discharge from your nipple." },
  ];

  const [isSelected, setSelection] = useState([
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

  return (
    <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={globalStyles.whiteOverlay}>
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
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={[globalStyles.listTitleTextExam, styles.listTitleTextExam]}>
              What did you notice?
            </ThemedText>

            {!isLoading && (<ThemedView style={[globalStyles.elevatedBox, {paddingVertical: 0}]}>
                {examTypeF ? (
                  <ThemedView style={[globalStyles.listContainer, styles.listContainer]}>
                    {info_f.map((item) => (
                      <ThemedView key={item.id} style={[globalStyles.listItemContainer, styles.listItemContainer]}>
                        <ThemedText style={styles.instructionText}>
                          {item.text}
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
                    {info_m.map((item: { id: number; text: string }) => (
                      <ThemedView key={item.id} style={[globalStyles.listItemContainer, styles.listItemContainer]}>
                        <ThemedText style={styles.instructionText}>
                          {item.text}
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
