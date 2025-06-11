import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import translationEn from "./locales/en-US/translations.json";
import translationEs from "./locales/es-ES/translations.json";
import translationAr from "./locales/ar-SA/translations.json";
import translationAs from "./locales/as-IN/translations.json";
import translationBn from "./locales/bn-BD/translations.json";
import translationFa from "./locales/fa-IR/translations.json";
import translationGu from "./locales/gu-IN/translations.json";
import translationHi from "./locales/hi-IN/translations.json";
import translationId from "./locales/id-ID/translations.json";
import translationJa from "./locales/ja-JP/translations.json";
import translationKn from "./locales/kn-IN/translations.json";
import translationMl from "./locales/ml-IN/translations.json";
import translationMr from "./locales/mr-IN/translations.json";
import translationOr from "./locales/or-IN/translations.json";
import translationPa from "./locales/pa-IN/translations.json";
import translationPt from "./locales/pt-PT/translations.json";
import translationRu from "./locales/ru-RU/translations.json";
import translationSw from "./locales/sw-KE/translations.json";
import translationTa from "./locales/ta-IN/translations.json";
import translationTe from "./locales/te-IN/translations.json";
import translationUr from "./locales/ur-PK/translations.json";
import translationUz from "./locales/uz-UZ/translations.json";
import translationZh from "./locales/zh-CN/translations.json";
import translationDe from "./locales/de-DE/translations.json";
import { getSetting, saveSetting } from "@/hooks/useSettings";

export const resources = {
  "en-US": { translation: translationEn },
  en: { translation: translationEn },
  "es-ES": { translation: translationEs },
  es: { translation: translationEs },
  "ar-SA": { translation: translationAr },
  ar: { translation: translationAr },
  "as-IN": { translation: translationAs },
  as: { translation: translationAs },
  "bn-BD": { translation: translationBn },
  bn: { translation: translationBn },
  "fa-IR": { translation: translationFa },
  fa: { translation: translationFa },
  "de-DE": { translation: translationDe },
  de: { translation: translationDe },
  "gu-IN": { translation: translationGu },
  gu: { translation: translationGu },
  "hi-IN": { translation: translationHi },
  hi: { translation: translationHi },
  "id-ID": { translation: translationId },
  id: { translation: translationId },
  "ja-JP": { translation: translationJa },
  ja: { translation: translationJa },
  "kn-IN": { translation: translationKn },
  kn: { translation: translationKn },
  "ml-IN": { translation: translationMl },
  ml: { translation: translationMl },
  "mr-IN": { translation: translationMr },
  mr: { translation: translationMr },
  "or-IN": { translation: translationOr },
  or: { translation: translationOr },
  "pa-IN": { translation: translationPa },
  pa: { translation: translationPa },
  "pt-BR": { translation: translationPt },
  pt: { translation: translationPt },
  "ru-RU": { translation: translationRu },
  ru: { translation: translationRu },
  "sw-KE": { translation: translationSw },
  sw: { translation: translationSw },
  "ta-IN": { translation: translationTa },
  ta: { translation: translationTa },
  "te-IN": { translation: translationTe },
  te: { translation: translationTe },
  "ur-PK": { translation: translationUr },
  ur: { translation: translationUr },
  "uz-UZ": { translation: translationUz },
  uz: { translation: translationUz },
  "zh-CN": { translation: translationZh },
  zh: { translation: translationZh },
};

const RTL_LANGUAGES = ["ar", "ar-SA", "fa", "fa-IR", "ur", "ur-PK"];

const initI18n = async () => {
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

    await i18n.use(initReactI18next).init({
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
