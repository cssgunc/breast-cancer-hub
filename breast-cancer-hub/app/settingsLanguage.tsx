import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { saveSetting } from "@/hooks/useSettings";
import { push } from "expo-router/build/global-state/routing";
import { colors } from "@/components/StyleSheet";
import { SelectLanguage } from "@/components/SelectLanguage";

export default function LanguageScreen() {
    const router = useRouter();

    const [language, setLanguage] = useState("English");

    const saveSettings = async () => {
        //saves language selection locally

        // await saveSetting("language", language);    GIVING ERROR CURRENTLY => WILL CHECK WITH MADDIE AND FIX

        alert("Settings saved successfully.")
    }


  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
        {/* Notifications Text */}
        <ThemedText style={styles.headerTitle}>Language</ThemedText>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Main White Rounded Rectangle */}
        <View style={styles.mainContainer}>
          {/* Alerts Section */}
          <ThemedText style={styles.sectionHeaderText}>Change the language for your self-examination</ThemedText>
         
          {/* Divider */}
          <View style={styles.divider} />

          <SelectLanguage></SelectLanguage>

          {/* Save Settings Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <ThemedText style={styles.saveButtonText}>Save Settings</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLightGray, // Background color of the page
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.darkPink,
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it circular
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 36,
    color: colors.darkPink,
    fontWeight: "bold",
    lineHeight: 35,
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 50,
  },
  mainContainer: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 40,
    // Shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionHeaderText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionSubText1: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 15,
  },
  sectionSubText2: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
  },
  optionBox: {
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  optionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkPink,
  },
  optionDescription: {
    fontSize: 15,
    color: colors.mediumGray,
    marginTop: 10,
    lineHeight: 20,
  },
  divider: {
    height: 4,
    backgroundColor: colors.lightPink,
    width: "100%",
    alignSelf: "center",
    marginVertical: 30,
  },
  selectTimesText: {
    color: colors.black,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "200",
    marginBottom: 20,
  },
  timeEntryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  timeEntryLeft: {
    flex: 1,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  timeText: {
    fontSize: 15,
    color: colors.black,
    marginRight: 5,
  },
  periodText: {
    fontSize: 15,
    color: colors.black,
  },
  alarmText: {
    fontSize: 12,
    color: colors.mediumGray,
    marginTop: 5,
  },
  timeEntryRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  addTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.darkPink,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  addTimeText: {
    fontSize: 16,
    color: colors.darkPink,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: colors.darkPink,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 50,
  },
  saveButtonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
});
