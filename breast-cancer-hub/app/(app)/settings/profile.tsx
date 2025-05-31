import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { saveSetting, getSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import ResetDataButton from "./(components)/ResetDataButton";
import ThemedButton from "@/components/ThemedButton";

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const { colors } = useColors();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getSetting("name").then((name) => {
      setName(name);
    });
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    saveSetting("name", name);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLightGray, // Background color of the page
      paddingBottom: 20,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: "15%",
      paddingHorizontal: 20,
      marginBottom: "5%",
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
      margin: 15,
    },
    mainContainer: {
      flex: 1, // Extend to the bottom
      width: "90%",
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 40,
      alignSelf: "center",
      // Shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    contentContainer: {
      paddingBottom: 20,
    },
    profileHeaderContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    divider: {
      height: 4,
      backgroundColor: colors.lightHighlight,
      width: "100%",
      marginVertical: 20,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 10,
    },
    changeNameButton: {
      marginTop: "auto", // Push the button to the bottom
      width: "100%",
    },
    input: {
      flex: 1,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.darkHighlight,
      marginRight: 8,
    },
    button: {
      padding: 8,
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
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        {/* Edit Profile Text */}
        <ThemedText type="title" style={styles.headerTitle} colored>
          Edit Profile
        </ThemedText>
      </View>

      {/* Main White Rounded Rectangle */}
      <View style={styles.mainContainer}>
        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Profile Icon */}
          <View style={styles.profileHeaderContainer}>
            <Ionicons name="person" size={48} color={colors.darkHighlight} />
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoFocus
              />
            ) : (
              <ThemedText type="heading" colored>
                {name}
              </ThemedText>
            )}
          </View>

          <View style={styles.divider} />
        </ScrollView>

        <ThemedView style={{ gap: 16 }}>
          {isEditing ? (
            <ThemedButton onPress={handleSave}>
              <ThemedText style={{ color: "white" }}>Save</ThemedText>
            </ThemedButton>
          ) : (
            <ThemedButton onPress={() => setIsEditing(true)}>
              <ThemedText style={{ color: "white" }}>Edit Name</ThemedText>
            </ThemedButton>
          )}
          <ResetDataButton />
        </ThemedView>
      </View>
    </ThemedView>
  );
}
