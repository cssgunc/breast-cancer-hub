import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { colors } from "@/components/StyleSheet";

export default function ProfileSettingsScreen() {
  const router = useRouter();

  const [person, setPerson] = useState({ name: "", email: "" });

  useEffect(() => {
    getSetting("name").then((name) =>
      getSetting("email").then((email) => {
        setPerson({ name, email });
      })
    );
  }, []);

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
            <Ionicons name="person" size={96} color={colors.darkPink} />
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
        <TouchableOpacity style={styles.signOutButton}>
          <ThemedText style={styles.signOutButtonText}>Sign Out</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
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
    paddingTop: "8%",
    paddingHorizontal: 20,
    marginBottom: "3%",
  },
  backButton: {
    backgroundColor: colors.darkPink,
    width: 40,
    height: 40,
    borderRadius: 20, // Circular
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 36,
    color: colors.darkPink,
    fontWeight: "bold",
    lineHeight: 40,
    marginTop: 30,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1, // Extend to the bottom
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 20, // Add padding at the bottom
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
    backgroundColor: colors.lightPink,
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
    color: colors.darkPink,
  },
  infoValue: {
    fontSize: 16,
    color: colors.black,
  },
  signOutButton: {
    backgroundColor: colors.darkPink,
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
