import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import AccountSettingsHeaderComponent from "@/components/navigation/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { useCheckupData } from "@/hooks/CheckupContext";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";

export default function CheckupDetails({ date }: { date: string }) {
  const router = useRouter();
  const { colors, globalStyles } = useColors();
  const [examDate, setExamDate] = useState(date);
  const { getCheckup } = useCheckupData();

  const info_f = [
    { id: 0, key: "Swelling of part or all of a breast." },
    {
      id: 1,
      key: "Skin irritation or dimpling (sometimes looking like an orange peel)",
    },
    { id: 2, key: "Breast or nipple pain." },
    { id: 3, key: "Nipple retraction (turning inward)" },
    {
      id: 4,
      key: "Redness, scaliness, or thickening of the nipples or breast skin",
    },
    { id: 5, key: "Nipple discharge (other than breast milk)" },
  ];

  const info_m = [
    { id: 0, key: "A painless lump or thickening in your breast tissue." },
    {
      id: 1,
      key: "Changes to the skin covering your breast, such as dimpling, wrinkling, redness, or scaling.",
    },
    {
      id: 2,
      key: "Changes to your nipple, such as redness or scaling, or a nipple that begins to turn inward.",
    },
    { id: 3, key: "Discharge from your nipple." },
  ];

  const [isSelected, setSelection] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting("schedulingType");
      // const schedulingType = "period";
      setExamTypeF(schedulingType === "period");
      setIsLoading(false);
    };

    const fetchHistory = async () => {
      if (examDate) {
        const checkup = await getCheckup(date);
        if (checkup) {
          setSelection(checkup.symptomsChecked);
        }
      }
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
      <ThemedView
        bgColor={colors.darkHighlight}
        style={globalStyles.bodyContainer}
      >
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText type="title" colored>
            Checkup History
          </ThemedText>

          <ThemedText type="heading">{formatDate(examDate)}</ThemedText>

          <ThemedView style={globalStyles.grayLine} />
        </ThemedView>

        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={styles.subtitleText}>Symptoms Logged</ThemedText>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={globalStyles.buttonBackNextContainer}>
              <ThemedButton
                variant="secondary"
                onPress={() => router.push("/")}
              >
                Back to Home{" "}
              </ThemedButton>
              <ThemedButton
                onPress={() =>
                  router.push({
                    pathname: "/selfExam/nextSteps",
                    params: {
                      symptoms: isSelected.map((value) => (value ? 1 : 0)),
                    },
                  })
                }
              >
                Next
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  } else {
    return (
      <ThemedView
        bgColor={colors.darkHighlight}
        style={globalStyles.bodyContainer}
      >
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={globalStyles.whiteOverlay}>
          <ThemedText type="title" colored>
            Checkup History
          </ThemedText>
          <ThemedText type="heading">{formatDate(examDate)}</ThemedText>

          <ThemedView style={globalStyles.grayLine} />
        </ThemedView>

        <ScrollView contentContainerStyle={globalStyles.scrollContent}>
          <ThemedView style={globalStyles.whiteOverlay}>
            {/* Info Section */}
            <ThemedText style={styles.subtitleText}>Symptoms Logged</ThemedText>

            <ThemedView style={globalStyles.elevatedCard}>
              {examTypeF ? (
                <ThemedView style={styles.listContainer}>
                  {info_f.map((item) => (
                    <ThemedView key={item.id} style={styles.listItemContainer}>
                      <ThemedText style={styles.instructionText}>
                        {item.key}
                      </ThemedText>
                      <View style={styles.checkBoxContainer}>
                        <CheckBox
                          value={isSelected.includes(item.key)}
                          disabled
                        />
                      </View>
                    </ThemedView>
                  ))}
                </ThemedView>
              ) : (
                <ThemedView style={styles.listContainer}>
                  {info_m.map((item: { id: number; key: string }) => (
                    <ThemedView key={item.id} style={styles.listItemContainer}>
                      <ThemedText style={styles.instructionText}>
                        {item.key}
                      </ThemedText>
                      <View style={styles.checkBoxContainer}>
                        <CheckBox
                          value={isSelected.includes(item.key)}
                          disabled
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
              <ThemedButton
                onPress={() =>
                  router.push({
                    pathname: "/selfExam/nextSteps",
                    params: {
                      symptoms: isSelected
                        .map((value) => (value ? 1 : 0))
                        .toString(),
                    },
                  })
                }
              >
                Next
              </ThemedButton>
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
