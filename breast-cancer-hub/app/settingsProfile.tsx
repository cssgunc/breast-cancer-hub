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
  const {colors} = useColors();

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
      backgroundColor: colors.darkHighlight,
      width: 40,
      height: 40,
      borderRadius: 20, // Circular
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 36,
      color: colors.darkHighlight,
      fontWeight: "bold",
      lineHeight: 40,
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
    userName: {
      fontSize: 24,
      color: colors.black,
      fontWeight: "bold",
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
    infoLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.darkHighlight,
    },
    infoValue: {
      fontSize: 16,
      color: colors.black,
    },
    signOutButton: {
      backgroundColor: colors.darkHighlight,
      borderRadius: 30,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: "auto", // Push the button to the bottom
      width: "100%",
    },
    signOutButtonText: {
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
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        {/* Edit Profile Text */}
        <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
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
            <ThemedText style={styles.userName}>{person.name}</ThemedText>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Username Section */}
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Username</ThemedText>
            <ThemedText style={styles.infoValue}>{person.name}</ThemedText>
          </View>
          <View style={styles.divider} />

          {/* Password Section */}
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Password</ThemedText>
            <ThemedText style={styles.infoValue}>•••••••</ThemedText>
          </View>
          <View style={styles.divider} />

          {/* Email Section */}
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Email</ThemedText>
            <ThemedText style={styles.infoValue}>{person.email}</ThemedText>
          </View>
        </ScrollView>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={() => logout()}>
          <ThemedText style={styles.signOutButtonText}>Sign Out</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
