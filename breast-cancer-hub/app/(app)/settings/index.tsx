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

import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";
import ResetDataButton from "./(components)/ResetDataButton";

export default function SettingsScreen() {
  const router = useRouter();

  const { colors, setDarkMode } = useColors();

  const [isTelemetryEnabled, setIsTelemetryEnabled] = React.useState(false);
  const [isBackupEnabled, setIsBackupEnabled] = React.useState(false);
  const [IsDarkThemeEnabled, setIsDarkThemeEnabled] = React.useState(false);

  // Pulling information from local storage
  useEffect(() => {
    getSetting("name").then((name) =>
      getSetting("email").then((email) =>
        getSetting("token").then((token) =>
          getSetting("userId").then((userId) => {
            setPerson({ name, email, token, userId });
          })
        )
      )
    );

    getSetting("useDarkTheme").then((dark) =>
      getSetting("useTelemetry").then((telemetry) =>
        getSetting("useBackupData").then((backup) => {
          setIsTelemetryEnabled(telemetry);
          setIsDarkThemeEnabled(dark);
          setIsBackupEnabled(backup);
        })
      )
    );
  }, []);

  const [person, setPerson] = useState({
    name: "",
    email: "",
    token: "",
    userId: "",
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundLightGray, // Background color of the page
    },
    headerContainer: {
      height: "10%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
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
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
        {/* Settings Text */}
        <ThemedText type="title" colored>
          Settings
        </ThemedText>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Main White Rounded Rectangle */}
        <View style={styles.mainContainer}>
          {/* User Info */}
          <View style={styles.userInfoContainer}>
            <View style={styles.userTextContainer}>
              <ThemedText type="title" colored>
                {person.name}
              </ThemedText>
              {/*<ThemedText>{person.email}</ThemedText>*/}
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

            {/* Telemetry */}
            {/* <View style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>
                Enable Telemetry
              </ThemedText>
              <Switch
                trackColor={{ false: "#767577", true: colors.lightHighlight }}
                thumbColor={isTelemetryEnabled ? colors.white : "#f4f3f4"}
                ios_backgroundColor={colors.darkGray}
                onValueChange={(value) => {
                  setIsTelemetryEnabled(value);
                  saveSetting("useTelemetry", value);
                }}
                value={isTelemetryEnabled}
              />
            </View> */}

            {/* Backup */}
            {/* <View style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>
                Backup Settings To Cloud
              </ThemedText>
              <Switch
                trackColor={{ false: "#767577", true: colors.lightHighlight }}
                thumbColor={isBackupEnabled ? colors.white : "#f4f3f4"}
                ios_backgroundColor={colors.darkGray}
                onValueChange={(value) => {
                  setIsBackupEnabled(value);
                  saveSetting("useBackupData", value);
                }}
                value={isBackupEnabled}
              />
            </View>*/}
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
