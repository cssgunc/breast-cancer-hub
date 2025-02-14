import { TouchableOpacity, Linking, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function LearnMoreTextContainer() {
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

const styles = StyleSheet.create({
  infoSourceText: {
    fontSize: 12,
    color: "#999999",
    marginTop: 20,
    fontStyle: "italic",
  },
  learnMoreText: {
    fontSize: 12,
    color: "#68C4FF",
    fontWeight: "bold",
  },
  learnMoreTextContainer: {
    alignItems: "center",
  },
});
