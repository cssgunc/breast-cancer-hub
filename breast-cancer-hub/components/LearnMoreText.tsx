import { TouchableOpacity, Linking, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { globalStyles, lightGray, blue } from "./StyleSheet";

export function LearnMoreTextContainer() {
  return (
    <ThemedView style={styles.learnMoreTextContainer}>
      <ThemedText style={[globalStyles.smallItalicText, styles.infoSourceText]}>
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
    color: lightGray,
    marginTop: 20,
  },
  learnMoreText: {
    fontSize: 12,
    color: blue,
    fontWeight: "bold",
  },
  learnMoreTextContainer: {
    alignItems: "center",
  },
});
