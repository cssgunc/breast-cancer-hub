import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColors } from "@/components/style/ColorContext";
import SelectLanguage from "@/app/(app)/settings/(components)/SelectLanguage";

export default function LanguageScreen() {
  const router = useRouter();

  const {colors} = useColors();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLightGray, // Background color of the page
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 50,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    backButton: {
      backgroundColor: colors.darkHighlight,
      width: 40,
      height: 40,
      borderRadius: 20, // Makes it circular
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    headerTitle: {
      fontSize: 36,
      color: colors.darkHighlight,
      fontWeight: "bold",
      lineHeight: 35,
      marginTop: 20,
      marginHorizontal: 10,
      marginBottom: 10,
    },
    contentContainer: {
      alignItems: "center",
      paddingBottom: 50,
    },
    mainContainer: {
      width: "90%",
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 40,
      // Shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    sectionHeaderText: {
      fontSize: 20,
      color: colors.black,
      fontWeight: "bold",
      marginBottom: 10,
    },
    divider: {
      height: 4,
      backgroundColor: colors.lightHighlight,
      width: "100%",
      alignSelf: "center",
      marginVertical: 30,
    },
    selectTimesText: {
      color: colors.black,
      fontSize: 16,
      fontStyle: "italic",
      fontWeight: "200",
      marginBottom: 20,
    },
    saveButton: {
      backgroundColor: colors.darkHighlight,
      borderRadius: 30,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 50,
    },
    saveButtonText: {
      fontSize: 20,
      color: colors.white,
      fontWeight: "bold",
    },
  });
    

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Language</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Main White Rounded Rectangle */}
        <View style={styles.mainContainer}>
          <ThemedText style={styles.sectionHeaderText}>Change the language for your self-examination</ThemedText>
            <View style={styles.divider} />
          <SelectLanguage></SelectLanguage>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
