import { useMemo, useState, useEffect } from "react";
import { StyleSheet, View, I18nManager } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useTranslation } from "react-i18next";
import { getSetting, saveSetting } from "@/hooks/useSettings";
import { useColors } from "../../../../components/style/ColorContext";
import { resources } from "@/i18n";

export const languageMap: Record<string, string> = {
  English: "en-US",
  Assamese: "as-IN",
  Arabic: "ar-SA",
  Bahasa: "id-ID",
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
  Portuguese: "pt-BR",
  Punjabi: "pa-IN",
  Russian: "ru-RU",
  Spanish: "es-ES",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Urdu: "ur-PK",
  Uzbek: "uz-UZ",
};

const RTL_LANGUAGES = ["ar", "ar-SA"];

function getAvailableLanguages(resources: typeof import("@/i18n").resources) {
  return Object.entries(languageMap)
    .filter(([_, code]) => code in resources)
    .map(([label]) => label);
}

export default function SelectLanguagePicker() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
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

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    const languageCode = languageMap[language];
    if (languageCode) {
      try {
        const isRTL = RTL_LANGUAGES.includes(languageCode);
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
        }
        await i18n.changeLanguage(languageCode);
        await saveSetting("locale", languageCode);
      } catch (error) {
        console.error("Error changing language: ", error);
      }
    }
  };

  const styles = StyleSheet.create({
    languageContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 8,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: colors.lighterGray,
      backgroundColor: colors.white,
    },
    picker: {
      width: 160,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
  });

  return (
    <ThemedView>
      <View style={styles.languageContainer}>
        <ThemedText>{t("Language: ")}</ThemedText>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={handleLanguageChange}
            style={styles.picker}
          >
            {availableLanguages.map((language) => (
              <Picker.Item
                key={language}
                label={t(language) || language}
                value={language}
              />
            ))}
          </Picker>
        </View>
      </View>
    </ThemedView>
  );
}
