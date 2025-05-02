import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";
import translationEn from "./locales/en-US/translations.json";
import translationEs from "./locales/es-ES/translations.json";
import translationAs from "./locales/as-IN/translations.json";
import translationAr from "./locales/ar-SA/translations.json";
import translationId from "./locales/id-ID/translations.json";
import { getSetting, saveSetting } from "@/hooks/useSettings";

const resources = {
  "en-US": { translation: translationEn },
  en: { translation: translationEn },
  "es-ES": { translation: translationEs },
  es: { translation: translationEs },
  "as-IN": { translation: translationAs },
  as: { translation: translationAs },
  "ar-SA": { translation: translationAr },
  ar: { translation: translationAr },
  "id-ID": { translation: translationId },
  id: { translation: translationId },
};

const RTL_LANGUAGES = ["ar", "ar-SA"];

const initI18n = async () => {
  console.log("i18n initialized");
  try {
    // Try to get saved language preference
    const savedLanguage = await getSetting("locale");

    // Determine which language to use
    let selectedLanguage = savedLanguage;

    if (!selectedLanguage) {
      // If no saved language, use device locale or fallback
      const deviceLocales = Localization.getLocales();
      const deviceLocale = deviceLocales[0]?.languageTag || "en-US";
      const languageCode = deviceLocale.split("-")[0];

      // Try exact locale match first
      if (deviceLocale in resources) {
        selectedLanguage = deviceLocale;
      }

      // Then try language code match
      else if (languageCode in resources) {
        selectedLanguage = languageCode;
      } else {
        selectedLanguage = "en-US";
      }
    }

    // Handle RTL layout
    const isRTL = RTL_LANGUAGES.includes(selectedLanguage);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }

    await i18n
      .use(RNLanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        lng: selectedLanguage,
        fallbackLng: {
          "en-*": ["en-US", "en"],
          "es-*": ["es-ES", "es", "en-US"],
          default: ["en-US"],
        },
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });

    // Save the selected language
    if (!savedLanguage) {
      await saveSetting("locale", selectedLanguage);
    }
  } catch (error) {
    console.error("Error initializing i18n:", error);

    // Initialize with defaults if there's an error
    await i18n.use(initReactI18next).init({
      resources,
      lng: "en-US",
      fallbackLng: "en-US",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
};

initI18n();

export default i18n;
