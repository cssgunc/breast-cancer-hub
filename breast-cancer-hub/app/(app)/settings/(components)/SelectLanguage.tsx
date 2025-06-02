import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, I18nManager } from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getSetting, saveSetting } from "@/hooks/useSettings";
import { useColors } from "../../../../components/style/ColorContext";
import { resources } from "@/i18n";

export const languageMap: Record<string, string> = {
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

const RTL_LANGUAGES = ["ar", "ar-SA"];

function getAvailableLanguages(resources: typeof import("@/i18n").resources) {
  return Object.entries(languageMap)
    .filter(([_, code]) => code in resources)
    .map(([label]) => label);
}

export default function SelectLanguage() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);
  const { colors, globalStyles } = useColors();

  const availableLanguages = useMemo(
    () => getAvailableLanguages(resources),
    []
  );

  useEffect(() => {
    const getStoredLanguage = async () => {
      try {
        const storedLanguageCode = await getSetting("locale");
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
        //handles RTL layout if needed
        const isRTL = RTL_LANGUAGES.includes(languageCode);
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }

        //changes the language and saves the preference
        await i18n.changeLanguage(languageCode);
        await saveSetting("locale", languageCode);
      } catch (error) {
        console.error("Error changing language: ", error);
      }
    }
  };

  const styles = StyleSheet.create({
    separator: {
      color: colors.lighterGray,
      marginHorizontal: 0,
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

  return (
    <ThemedView>
      {/* Button to open the dropdown */}
      <TouchableOpacity
        style={[globalStyles.settingsButton]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedText type="default" bold>
          {t("Select Language")}
        </ThemedText>
        <ThemedText style={styles.separator}> | </ThemedText>
        <ThemedText type="default" bold>
          {selectedLanguage}
        </ThemedText>
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={colors.icon}
        />
      </TouchableOpacity>

      {/* Dropdown content */}
      {isOpen && (
        <ThemedView style={styles.dropdown}>
          {availableLanguages.map((language) => (
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
