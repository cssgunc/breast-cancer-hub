import { ThemedText } from "@/components/style/ThemedText";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "@/components/style/ColorContext";
import { ThemedView } from "@/components/style/ThemedView";
import { getSetting } from "@/hooks/useSettings";
import i18n from "@/i18n";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: "#E0E0E0",
      boxShadow: "0.5px 0.5px 3px 0 rgb(0 0 0 / 80%)",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/checkupHistory/details`,
          params: { date: completedOn, symptoms: symptomsChecked },
        })
      }
    >
      <ThemedView style={[styles.card]}>
        <ThemedText bold>
          <ThemedText bold colored>
            {formatDate(completedOn)}
          </ThemedText>{" "}
          ({symptomsChecked.length} symptom
          {symptomsChecked.length === 1 ? "" : "s"})
        </ThemedText>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.darkHighlight}
          style={{ marginLeft: 8 }}
        />
      </ThemedView>
    </TouchableOpacity>
  );
}
