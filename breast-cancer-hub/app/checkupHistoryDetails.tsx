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
import { useColors } from "@/components/ColorContext";

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

export default function HomeScreen() {
  const router = useRouter();
  const {colors, globalStyles} = useColors();
  // const [symptomData, setSymptomData] = useState<number[]>([]);
  const [examDate, setExamDate] = useState("");



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

    const fetchHistory = async () => {
      // const history = await getExaminationData(date);
      // above should get exam data for specific date from local storage
      // if (history) {
      //   setSymptomData(history.symptoms);
      //   i.e. symptoms = [true, true, false, false, false, true]
      //   setExamDate(history.date);
      //   i.e. date = "2025-03-05T14:48:00.000Z" as an iso string
      // }
      setExamDate("2025-03-05T14:48:00.000Z");
      const symptomList = examTypeF ? info_f : info_m;
      const n = symptomList.length;
      const symptoms = Array.from({ length: n }, (_, i) => i % 2 === 0);
      setSelection(symptoms);
    };

    getType();
    fetchHistory();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const styles = StyleSheet.create({
    iconWrapper: {
      backgroundColor: colors.lightHighlight,
      borderRadius: 30,
      padding: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    titleText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.black,
    },
    highlightedTitleText: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.darkHighlight,
      marginBottom: 15,
      paddingTop: 10,
    },
    subtitleText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.black,
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
    instructionTextBold: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.darkHighlight,
    },
    instructionText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.black,
      maxWidth: "80%",
    },
    infoSourceText: {
      fontSize: 12,
      color: colors.lightGray,
      marginTop: 20,
      fontStyle: "italic",
    },
    learnMoreText: {
      fontSize: 12,
      color: colors.blue,
      fontWeight: "bold",
    },
    learnMoreTextContainer: {
      alignItems: "center",
    },
    buttonNext: {
      backgroundColor: colors.darkHighlight,
      borderColor: colors.darkHighlight,
    },
  });
  

  if (isLoading == true) {
    return (
      <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText style={styles.highlightedTitleText}>
            Checkup History
          </ThemedText>

          <ThemedText style={styles.titleText}>{formatDate(examDate)}</ThemedText>

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
                style={[globalStyles.buttonNext, styles.buttonNext]}
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
      <ThemedView style={globalStyles.container}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText style={styles.highlightedTitleText}>
            Checkup History
          </ThemedText>
          <ThemedText style={styles.titleText}>{formatDate(examDate)}</ThemedText>

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
                style={[globalStyles.buttonNext, styles.buttonNext]}
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
