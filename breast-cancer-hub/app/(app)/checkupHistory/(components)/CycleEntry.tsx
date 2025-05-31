import { ThemedText } from "@/components/style/ThemedText";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "@/components/style/ColorContext";
import { ThemedView } from "@/components/style/ThemedView";
import { getSetting } from "@/hooks/useSettings";
import i18n from "@/i18n";
import { useEffect, useState } from "react";

interface CheckupWidgetProps {
  completedOn: string;
  symptomsChecked: string[];
}

export default function CheckupWidget({
  completedOn,
  symptomsChecked,
}: CheckupWidgetProps) {
  const { colors } = useColors();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: "white",
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: "#E0E0E0",
      boxShadow: "0.5px 0.5px 3px 0 rgb(0 0 0 / 80%)",
    },
    periodText: {
      fontWeight: "bold",
      fontSize: 16,
      color: colors.black,
    },
    completedText: {
      fontSize: 14,
    },
    pastExamsText: {
      fontSize: 14,
      color: colors.blue,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  });

  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    const getLocale = async () => {
      const storedLanguageCode = await getSetting("locale");
      if (storedLanguageCode && i18n.language !== storedLanguageCode) {
        await i18n.changeLanguage(storedLanguageCode);
      }
      await setLocale(storedLanguageCode);
    };

    getLocale();
  }, []);

  const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ThemedView>
      <ThemedView style={[styles.card]}>
        <ThemedText style={styles.periodText}>
          {formatDate(completedOn)} ({symptomsChecked.length} symptoms recorded)
        </ThemedText>
        <ThemedText style={styles.completedText}></ThemedText>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/checkupHistory/details`,
              params: { date: completedOn, symptoms: symptomsChecked },
            })
          }
        >
          <ThemedText style={styles.pastExamsText}>
            View checkup details
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
