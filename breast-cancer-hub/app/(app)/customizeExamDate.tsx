import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { saveSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import { customizeStyles } from "./customizeCalendar";
import ThemedButton from "@/components/ThemedButton";

export default function CustomizeExamDateScreen() {
  const router = useRouter();
  const { colors, globalStyles } = useColors();
  const [examDay, setExamDay] = useState<number>(1); // Default examination day as number

  const handleSaveChanges = () => {
    saveSetting("schedulingType", {
      day: examDay,
    }).then(() => router.push("/"));
  };

  const incrementDay = () => {
    if (examDay < 28) {
      setExamDay(examDay + 1);
    }
  };

  const decrementDay = () => {
    if (examDay > 1) {
      setExamDay(examDay - 1);
    }
  };

  const styles = StyleSheet.create({
    changeAnytimeText: {
      fontSize: 15,
      color: colors.darkHighlight,
      fontStyle: "italic",
      marginTop: 10,
      marginBottom: 20,
      textAlign: "center",
    },
    saveButton: {
      backgroundColor: colors.darkHighlight,
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: "center",
      marginTop: 70,
      width: "50%",
    },
    saveButtonText: {
      fontSize: 16,
      color: colors.white,
      fontWeight: "bold",
    },
    chevronContainer: {
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: 10,
    },
    chevronButton: {
      marginVertical: 5,
    },
    chevronCircle: {
      backgroundColor: colors.mediumHighlight,
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    dayDisplay: {
      flex: 1,
      fontSize: 40,
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 50,
    },
    pinkRectangle: {
      backgroundColor: colors.darkHighlight,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 40,
      width: "60%",
    },
  });

  return (
    <ThemedView
      bgColor={colors.backgroundLightGray}
      style={globalStyles.bodyContainer}
    >
      {/* Header */}
      <View style={customizeStyles.headerContainer}>
        {/* Header Content */}
        <View style={customizeStyles.headerContent}>
          {/* Back Button */}
          <TouchableOpacity
            style={[
              customizeStyles.backButton,
              { backgroundColor: colors.darkHighlight },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
          {/* Title */}
          <View style={customizeStyles.titleContainer}>
            <ThemedText type="title">Customize Your</ThemedText>
            <ThemedText type="title" colored>
              Examination Date
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Main Body */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={customizeStyles.bodyContainer}>
          {/* White Rectangle */}
          <View style={customizeStyles.whiteBox}>
            <ThemedText type="heading">
              Choose the day that you would like to perform a monthly self
              examination
            </ThemedText>

            <View style={{ height: 20 }} />

            <ThemedText>Choose a day from 1-28</ThemedText>

            <View style={{ height: 20 }} />

            {/* Highlight Rectangle */}
            <View style={styles.pinkRectangle}>
              {/* Display Exam Day */}
              <TextInput
                value={examDay.toString()}
                style={styles.dayDisplay}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  if (!isNaN(num)) {
                    if (num >= 1 && num <= 28) {
                      setExamDay(num);
                    } else if (num > 28) {
                      setExamDay(28);
                    } else if (num < 1) {
                      setExamDay(1);
                    }
                  }
                }}
                maxLength={2}
                textAlign="center"
                selectTextOnFocus
              />

              {/* Up and Down Buttons */}
              <View style={styles.chevronContainer}>
                <TouchableOpacity
                  onPress={incrementDay}
                  style={styles.chevronButton}
                >
                  <View style={styles.chevronCircle}>
                    <Ionicons
                      name="chevron-up"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={decrementDay}
                  style={styles.chevronButton}
                >
                  <View style={styles.chevronCircle}>
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 10 }} />

            <ThemedText style={styles.changeAnytimeText}>
              This can be changed at any time
            </ThemedText>

            <ThemedButton onPress={handleSaveChanges}>
              Save Changes
            </ThemedButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}
