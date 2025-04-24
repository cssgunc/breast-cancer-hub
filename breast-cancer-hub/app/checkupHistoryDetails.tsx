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
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { getSetting, SettingsMap } from "../hooks/useSettings";
import { LearnMoreTextContainer } from "../components/LearnMoreText";
import { useCheckupStorage } from "@/hooks/useCheckupStorage";
import { useColors } from "@/components/ColorContext";

export default function HomeScreen() {
  const router = useRouter();
  const {colors, globalStyles} = useColors();
  // const [symptomData, setSymptomData] = useState<number[]>([]);
  const { symptoms, fetchSymptoms } = useCheckupStorage(); 
  const { date } = useLocalSearchParams<{ date?: string }>();
  const [examDate, setExamDate] = useState(date);

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
      // const schedulingType = "period";
      setExamTypeF(schedulingType === "period");
      setIsLoading(false);
    };
    getType();

  }, []);

  useEffect(() => { 
      fetchSymptoms(date!);
      console.log(symptoms, "symptoms from fetchSymptoms"); 
      setSelection(symptoms);
  }
  , [examDate]);


  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading == true) {
    return (
      <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText style={globalStyles.titleTextDarkHighlight}>
            Checkup History
          </ThemedText>

          <ThemedText style={globalStyles.listTitleTextExam}>{formatDate(examDate!)}</ThemedText>

          <ThemedView style={globalStyles.grayLine} />

          {/* Debug button */}
          {/* <TouchableOpacity style={styles.buttonBack} onPress={() => logSelection()}>
          <ThemedText style={styles.buttonTextBack}>log</ThemedText>
        </TouchableOpacity> */}
        </ThemedView>

        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={styles.subtitleText}>
              Symptoms Logged
            </ThemedText>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={globalStyles.buttonBackNextContainer}>
              <TouchableOpacity
                style={globalStyles.buttonBack}
                onPress={() => router.push("/")}
              >
                <ThemedText style={globalStyles.buttonTextBack}>Back to Home</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.buttonNext}
                onPress={() =>
                  router.push({
                    pathname: "/selfExamNextSteps",
                    params: {
                      symptoms: isSelected.map((value) => (value ? 1 : 0)),
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
    );
  } else {
    return (
      <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText style={globalStyles.titleTextDarkHighlight}>
            Checkup History
          </ThemedText>
          <ThemedText style={globalStyles.listTitleTextExam}>{formatDate(examDate!)}</ThemedText>

          <ThemedView style={globalStyles.grayLine} />

          {/* Debug button */}
          {/* <TouchableOpacity style={styles.buttonBack} onPress={() => logSelection()}>
            <ThemedText style={styles.buttonTextBack}>log</ThemedText>
          </TouchableOpacity> */}
        </ThemedView>

        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={styles.subtitleText}>
              Symptoms Logged
            </ThemedText>

            <ThemedView style={globalStyles.elevatedBox}>
              {examTypeF ? (
                <ThemedView style={styles.listContainer}>
                  {info_f.map((item) => (
                    <ThemedView key={item.id} style={styles.listItemContainer}>
                      <ThemedText style={styles.instructionText}>
                        {item.text}
                      </ThemedText>
                      <View style={styles.checkBoxContainer}>
                        <CheckBox
                          value={isSelected[item.id]} disabled
                        />
                      </View>
                    </ThemedView>
                  ))}
                </ThemedView>
              ) : (
                <ThemedView style={styles.listContainer}>
                  {info_m.map((item: { id: number; text: string }) => (
                    <ThemedView key={item.id} style={styles.listItemContainer}>
                      <ThemedText style={styles.instructionText}>
                        {item.text}
                      </ThemedText>
                      <View style={styles.checkBoxContainer}>
                        <CheckBox
                          key={item.id}
                          value={isSelected[item.id]} disabled
                        />
                      </View>
                    </ThemedView>
                  ))}
                </ThemedView>
              )}
            </ThemedView>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={globalStyles.buttonBackNextContainer}>
              <TouchableOpacity
                style={globalStyles.buttonBack}
                onPress={() => router.push("./")}
              >
                <ThemedText style={globalStyles.buttonTextBack}>
                  Back to Home
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
    );
  }
}

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: "#EFCEE6",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  checkBoxContainer: {
    flexDirection: "column",
    marginBottom: 20,
    alignContent: "center",
    alignItems: "flex-end",
    marginTop: 5,
  },
  listContainer: {
    backgroundColor: "transparent",
    width: 315,
  },
  listItemContainer: {
    flexDirection: "row",
    columnGap: 20,
    textAlign: "left",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    maxWidth: "80%",
  },
  infoSourceText: {
    fontSize: 12,
    color: "#999999",
    marginTop: 20,
    fontStyle: "italic",
  },
  learnMoreText: {
    fontSize: 12,
    color: "#68C4FF",
    fontWeight: "bold",
  },
  learnMoreTextContainer: {
    alignItems: "center",
  },
});
