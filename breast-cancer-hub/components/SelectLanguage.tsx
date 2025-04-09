import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  I18nManager,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { colors } from "./StyleSheet";
import { useEffect } from "react";

const languageMap: Record<string, string> = {
  English: "en-US",
  Assamese: "as-IN",
  Arabic: "ar-SA",
  Bahasa: "id-ID", // Indonesian (Bahasa Indonesia)
  Bengali: "bn-BD",
  Chinese: "zh-CN",
  German: "de-DE",
  Gujarati: "gu-IN",
  Hindi: "hi-IN",
  Japanese: "ja-JP",
  Kannada: "kn-IN",
  Kiswahili: "sw-KE",
  Malayalam: "ml-IN",
  Marathi: "mr-IN",
  Odia: "or-IN",
  Persian: "fa-IR",
  Portuguese: "pt-BR", // Assuming Brazilian Portuguese, use "pt-PT" for European Portuguese
  Punjabi: "pa-IN",
  Russian: "ru-RU",
  Spanish: "es-ES",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Urdu: "ur-PK", // Assuming Pakistan Urdu, "ur-IN" for Indian Urdu
  Uzbek: "uz-UZ",
};

const languages = Object.keys(languageMap);

export function SelectLanguage() {
  const { t, i18n } = useTranslation(); 
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  useEffect(() => {
    const getStoredLanguage = async () => {
      try {
        const storedLanguageCode = await AsyncStorage.getItem("@app_language");
        if (storedLanguageCode) {
          const matchedLanguage = Object.keys(languageMap).find(
            (key) => languageMap[key] === storedLanguageCode
          );
          if (matchedLanguage) {
            setSelectedLanguage(matchedLanguage);
          }
        }
      } catch (error) {
        console.error("Error loading stored language:", error);
      }
    };
  
    getStoredLanguage();
  }, []);

  //handles the language switch, sets RTL if necessary, and saves the preference.
  const toggleLanguage = async (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    const languageCode = languageMap[language];
    if (languageCode) {
      try {
        const RTL_LANGUAGES = ["ar", "ar-SA"];
        const LANGUAGE_KEY = "@app_language";

        //handles RTL layout if needed
        const isRTL = RTL_LANGUAGES.includes(languageCode);
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }

        //changes the language and saves the preference
        await i18n.changeLanguage(languageCode);
        await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
      } catch (error) {
        console.error("Error changing language: ", error);
      }
    }
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
          {t("Select Language")}
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
              <ThemedText>{t(`${language}`) || language}</ThemedText>
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
    height: 48,
    backgroundColor: colors.white, // White background
    paddingHorizontal: 18, // Padding for button content
    borderWidth: 2,
    borderColor: "#aaaaaa", // Border color for button
    marginTop: 20
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
    marginTop: 5,
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
