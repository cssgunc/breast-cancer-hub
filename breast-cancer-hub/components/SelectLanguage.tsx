import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { BorderlessButton } from "react-native-gesture-handler";
import { colors } from "./StyleSheet";

const languages = ["EN", "SP", "FR", "RU", "ZH"];

export function SelectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  const toggleLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <ThemedView>
      {/* Button to open the dropdown */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.selectLanguageText}>
          Select Language
        </ThemedText>
        <ThemedText style={styles.separator}> | </ThemedText>
        <ThemedText style={styles.language}>{selectedLanguage}</ThemedText>
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      </TouchableOpacity>

      {/* Dropdown content */}
      {isOpen && (
        <ThemedView style={styles.dropdown}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              style={styles.languageOption}
              onPress={() => toggleLanguage(language)}
            >
              <ThemedText>{language}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

// TODO: Make these colors match the Figma/style sheet
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 25,
    width: 217,
    height: 48,
    backgroundColor: colors.white, // White background
    paddingHorizontal: 18, // Padding for button content
    borderWidth: 2,
    borderColor: "#aaaaaa", // Border color for button
  },
  selectLanguageText: {
    color: "#666666", // Grey color for 'Select Language'
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    color: "#cccccc", // Light grey color for separator '|'
    marginHorizontal: 0,
  },
  language: {
    color: "#666666", // Black color for the selected language (can change based on theme)
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    marginTop: 0,
    borderWidth: 2,
    borderColor: "#cccccc",
    borderRadius: 25,
    backgroundColor: colors.white, // Background for dropdown
  },
  languageOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
});
