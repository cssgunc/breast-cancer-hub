import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons } from "@expo/vector-icons";

import { useRouter, useLocalSearchParams } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";

export default function SettingsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromBottomNav = params.fromBottomNav === "1";

  const { colors, setDarkMode } = useColors();
  const [IsDarkThemeEnabled, setIsDarkThemeEnabled] = React.useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    getSetting("name").then((name) => {
      setName(name);
    });

    getSetting("useDarkTheme").then((dark) => {
      setIsDarkThemeEnabled(dark);
    });
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLightGray,
    },
    headerContainer: {
      backgroundColor: colors.white,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      // Shadow
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 6,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      backgroundColor: "transparent",
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    chevronButton: {
      backgroundColor: colors.darkHighlight,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    titleContainer: {
      alignItems: "center",
      flex: 1,
      marginHorizontal: 10,
    },
    contentContainer: {
      alignItems: "center",
      paddingBottom: 50,
    },
    mainContainer: {
      marginTop: 5,
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
    userInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    userTextContainer: {
      flex: 1,
    },
    profileIconContainer: {
      backgroundColor: colors.mediumHighlight, //Light-ish pink used specifically for
      width: 60,
      height: 60,
      borderRadius: 30, // Circular
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      height: 4,
      backgroundColor: colors.lightHighlight,
      width: "100%",
      alignSelf: "center",
      marginVertical: 30,
    },
    sectionContainer: {
      flexDirection: "column",
      gap: 5,
      marginBottom: 0,
    },
    sectionHeaderText: {
      marginBottom: 10,
    },
    optionContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    optionText: {
      flex: 0.9,
      flexWrap: "wrap",
    },
    optionPressable: {},
    saveButton: {
      marginTop: 50,
    },
  });
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          {/* Navigation Button - Show home icon when from bottom nav, back button otherwise */}
          <TouchableOpacity
            style={fromBottomNav ? styles.backButton : styles.chevronButton}
            onPress={() =>
              fromBottomNav ? router.push("/home") : router.back()
            }
          >
            <Ionicons
              name={fromBottomNav ? "home" : "chevron-back"}
              size={24}
              color={fromBottomNav ? colors.darkHighlight : colors.white}
            />
          </TouchableOpacity>
          {/* Settings Text */}
          <View style={styles.titleContainer}>
            <ThemedText type="title" colored>
              Settings
            </ThemedText>
          </View>
          {/* Empty space for layout balance */}
          <View style={{ width: 40 }} />
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Main White Rounded Rectangle */}
        <View style={styles.mainContainer}>
          {/* User Info */}
          <View style={styles.userInfoContainer}>
            <View style={styles.userTextContainer}>
              <ThemedText type="title" colored>
                {name.length ? name : "User"}
              </ThemedText>
            </View>
            {/* Profile Icon */}
            <View style={styles.profileIconContainer}>
              <Ionicons name="person" size={36} color={colors.darkHighlight} />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* General Section */}
          <View style={styles.sectionContainer}>
            <ThemedText type="heading" style={styles.sectionHeaderText}>
              General
            </ThemedText>

            {/* Notification Preferences */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => router.push("/settings/notifications")}
            >
              <ThemedText style={styles.optionText}>
                Change Notification Preferences
              </ThemedText>
              <Ionicons
                style={styles.optionPressable}
                name="chevron-forward"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>

            {/* Change Self Examination Language */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => router.push("/settings/language")}
            >
              <ThemedText style={styles.optionText}>
                Change Breast Self Exam Language
              </ThemedText>
              <Ionicons
                style={styles.optionPressable}
                name="chevron-forward"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>

            {/* Dark Mode */}
            <View style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>
                Switch Color Scheme
              </ThemedText>
              <Switch
                trackColor={{ false: "#767577", true: colors.lightHighlight }}
                thumbColor={IsDarkThemeEnabled ? colors.white : "#f4f3f4"}
                ios_backgroundColor={colors.darkGray}
                onValueChange={() => {
                  setDarkMode(!IsDarkThemeEnabled);
                  setIsDarkThemeEnabled(!IsDarkThemeEnabled);
                }}
                value={IsDarkThemeEnabled}
              />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Account Settings Section */}
          <View style={styles.sectionContainer}>
            <ThemedText type="heading" style={styles.sectionHeaderText}>
              Account Settings
            </ThemedText>

            {/* Edit Profile */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => router.push("/settings/profile")}
            >
              <ThemedText style={styles.optionText}>
                Edit/Delete Profile
              </ThemedText>
              <Ionicons
                style={styles.optionPressable}
                name="chevron-forward"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>

            {/* Change Date or Scheduling Type */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => {
                router.push("/chooseMenstruationStatus");
              }}
            >
              <ThemedText style={styles.optionText}>
                Change Menstruation Status/Exam Date
              </ThemedText>
              <Ionicons
                style={styles.optionPressable}
                name="chevron-forward"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>

            {/* Repeat onboarding */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => router.push("/onboarding")}
            >
              <ThemedText style={styles.optionText}>
                Repeat Introduction/Setup Sequence
              </ThemedText>
              <Ionicons
                style={styles.optionPressable}
                name="chevron-forward"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
