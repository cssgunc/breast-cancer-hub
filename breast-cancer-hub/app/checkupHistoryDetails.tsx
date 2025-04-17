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
import { useCheckupStorage } from "@/hooks/useCheckupStorage";

export default function HomeScreen({ date }: { date: string }) {
  const router = useRouter();

  // const [symptomData, setSymptomData] = useState<number[]>([]);
  const [examDate, setExamDate] = useState(date);
  const { symptoms, fetchSymptoms } = useCheckupStorage(); 

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

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting("schedulingType");
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
      // setExamDate("2025-03-05T14:48:00.000Z");
      if (examDate) {
        fetchSymptoms(date);
      }
      // const symptomList = examTypeF ? info_f : info_m;
      // const n = symptomList.length;
      // const symptoms = Array.from({ length: n }, (_, i) => i % 2 === 0);
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

  if (isLoading == true) {
    return (
      <ThemedView style={styles.container}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={styles.whiteOverlay}>
          <ThemedText style={styles.highlightedTitleText}>
            Checkup History
          </ThemedText>

          <ThemedText style={styles.titleText}>{formatDate(examDate)}</ThemedText>

          <ThemedView style={styles.grayLine} />

          {/* Debug button */}
          {/* <TouchableOpacity style={styles.buttonBack} onPress={() => logSelection()}>
          <ThemedText style={styles.buttonTextBack}>log</ThemedText>
        </TouchableOpacity> */}
        </ThemedView>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={styles.subtitleText}>
              Symptoms Logged
            </ThemedText>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => router.push("/")}
              >
                <ThemedText style={styles.buttonTextBack}>Back to Home</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNext}
                onPress={() =>
                  router.push({
                    pathname: "/selfExamNextSteps",
                    params: {
                      symptoms: isSelected.map((value) => (value ? 1 : 0)),
                    },
                  })
                }
              >
                <ThemedText style={styles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  } else {
    return (
      <ThemedView style={styles.container}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={styles.whiteOverlay}>
          <ThemedText style={styles.highlightedTitleText}>
            Checkup History
          </ThemedText>
          <ThemedText style={styles.titleText}>{formatDate(examDate)}</ThemedText>

          <ThemedView style={styles.grayLine} />

          {/* Debug button */}
          {/* <TouchableOpacity style={styles.buttonBack} onPress={() => logSelection()}>
            <ThemedText style={styles.buttonTextBack}>log</ThemedText>
          </TouchableOpacity> */}
        </ThemedView>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={styles.subtitleText}>
              Symptoms Logged
            </ThemedText>

            <ThemedView style={styles.elevatedBox}>
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
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => router.push("./")}
              >
                <ThemedText style={styles.buttonTextBack}>
                  Back to Home
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNext}
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
                <ThemedText style={styles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E93C92",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#E93C92",
  },
  iconWrapper: {
    backgroundColor: "#EFCEE6",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  highlightedTitleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E93C92",
    marginBottom: 15,
    paddingTop: 10,
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  elevatedBox: {
    backgroundColor: "#FFF7FD",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: "#E93C92",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ACACAC",
  },
  buttonNext: {
    backgroundColor: "#E93C92",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#E93C92",
  },
  buttonTextBack: {
    color: "#E93C92",
    fontSize: 18,
  },
  buttonTextNext: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  grayLine: {
    height: 2,
    backgroundColor: "#D3D3D3",
    marginVertical: 10,
  },
});
