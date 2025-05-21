import { TouchableOpacity, Linking, StyleSheet } from "react-native";
import { ThemedText } from "./style/ThemedText";
import { ThemedView } from "./style/ThemedView";
import { useColors } from "@/components/style/ColorContext";

export function LearnMoreTextContainer() {
  const { colors } = useColors();

  const styles = StyleSheet.create({
    infoSourceText: {
      fontSize: 12,
      lineHeight: 12,
      color: colors.lightGray,
      textAlign: "center",
    },
    learnMoreText: {
      fontSize: 12,
      lineHeight: 12,
      color: colors.blue,
    },
    learnMoreTextContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <ThemedView style={styles.learnMoreTextContainer}>
      <ThemedText style={styles.infoSourceText}>
        Information is sourced from Breast Cancer Hub
      </ThemedText>
      <TouchableOpacity>
        <ThemedText
          style={styles.learnMoreText}
          onPress={() =>
            Linking.openURL(
              "https://www.breastcancerhub.org/about-breast-cancer"
            )
          }
        >
          Learn more here
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
