import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { saveSetting, getSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/ColorContext";

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const {colors, globalStyles} = useColors();

  const [person, setPerson] = useState({ name: "", email: "", token: "", userId: ""});

  useEffect(() => {
    getSetting("name").then((name) =>
      getSetting("email").then((email) => 
        getSetting("token").then((token) => 
          getSetting("userId").then((userId) => {
        setPerson({ name,email,token, userId});
      })
    )
    )
    );
  }, []);

  function logout() {
    saveSetting("name", "");
    saveSetting("token", "");
    saveSetting("email", "");
    saveSetting("userId", "");
    router.dismissAll();
    router.replace("/login");
  }

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
      ...globalStyles.buttonPrimary,
      width: 40,
      height: 40,
      justifyContent: "center",
    },
    headerTitle: {
      margin:  15,
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
    profileIconContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    userInfoContainer: {
      alignItems: "flex-start",
      width: "100%",
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
    signOutButton: {
      ...globalStyles.buttonPrimary,
      marginTop: "auto", // Push the button to the bottom
      width: "100%",
    }
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
        <ThemedText type="title" style={styles.headerTitle}>Edit Profile</ThemedText>
      </View>

      {/* Main White Rounded Rectangle */}
      <View style={styles.mainContainer}>
        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Profile Icon */}
          <View style={styles.profileIconContainer}>
            <Ionicons name="person" size={96} color={colors.darkHighlight} />
          </View>

          {/* User Info */}
          <View style={styles.userInfoContainer}>
            <ThemedText type="subtitle" colored>{person.name}</ThemedText>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Username Section */}
          <View style={styles.infoRow}>
            <ThemedText bold>Username</ThemedText>
            <ThemedText>{person.name}</ThemedText>
          </View>
          <View style={styles.divider} />

          {/* Password Section */}
          <View style={styles.infoRow}>
            <ThemedText bold>Password</ThemedText>
            <ThemedText>•••••••</ThemedText>
          </View>
          <View style={styles.divider} />

          {/* Email Section */}
          <View style={styles.infoRow}>
            <ThemedText bold>Email</ThemedText>
            <ThemedText>{person.email}</ThemedText>
          </View>
        </ScrollView>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={() => logout()}>
          <ThemedText style={globalStyles.buttonTextPrimary}>Sign Out</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
