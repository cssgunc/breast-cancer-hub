import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { colors } from "@/components/StyleSheet";



export default function SettingsScreen() {
  const router = useRouter();
  const [isTelemetryEnabled, setIsTelemetryEnabled] = React.useState(false);
  const [isBackupEnabled, setIsBackupEnabled] = React.useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);
  
  // API call to update user settings once "save settings" button is clicked
  function saveSettings() {
    fetch("http://localhost:3000/settings" + "?user_id=" + person.userId, {
      method: "PUT", 
      headers: {
        "Content-Type" : "application/json",
        "x-session-token": person.token,
        'x-user-email' : person.email,
        },
        body: JSON.stringify({use_telemetry: isTelemetryEnabled, use_dark_mode: isDarkModeEnabled, use_backup_data: isBackupEnabled, user_id: person.userId, scheduling_type: "period", notification_times: '02:43:49.441286', locale: "temp"})
      })
  }
  
  // Pulling information from local storage
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

  const [person, setPerson] = useState({ name: "", email: "", token: "", userId: ""});

  // API call to read user settings.
  useEffect(() => {
    if (person.token == "") {
      return
    } else {
      fetch("http://localhost:3000/settings" + "?user_id=" + person.userId, {
        method: "GET", 
        headers: {
          "x-session-token": person.token,
          'x-user-email' : person.email,
          }
        })
        .then(response => response.json())
        .then(data => {
          setIsTelemetryEnabled(data.settings.use_telemetry);
          setIsDarkModeEnabled(data.settings.use_dark_mode);
          setIsBackupEnabled(data.settings.use_backup_data);
        })
        .catch(error => console.error(error));
    }
  }, [person.token]);
  
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
        <ThemedText style={styles.settingsText}>Settings</ThemedText>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Main White Rounded Rectangle */}
        <View style={styles.mainContainer}>
          {/* User Info */}
          <View style={styles.userInfoContainer}>
            <View style={styles.userTextContainer}>
              <ThemedText style={styles.userNameText}>{person.name}</ThemedText>
              <ThemedText style={styles.userEmailText}>
                {person.email}
              </ThemedText>
            </View>
            {/* Profile Icon */}
            <View style={styles.profileIconContainer}>
              <Ionicons name="person" size={36} color={colors.darkPink} />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* General Section */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionHeaderText}>General</ThemedText>

            {/* Notification Preferences */}
            <TouchableOpacity
              style={[styles.optionContainer, {height: 1}]}
              onPress={() => router.push("./settingsNotifications")}
            >
              <ThemedText style={styles.optionText}>
                Notification Preferences
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color={colors.black} />
            </TouchableOpacity>

            {/* Change Self Examination Language */}
            <TouchableOpacity style={[styles.optionContainer, {height: 1}]}>
              <ThemedText style={styles.optionText}>
                Change Self Examination Language
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color={colors.black} />
            </TouchableOpacity>

            {/* Telemetry */}
            <View style={[styles.optionContainer, {height: 1}]}>
              <ThemedText style={styles.optionText}>Telemetry</ThemedText>
              <Switch
                trackColor={{ false: "#767577", true: colors.lightPink }}
                thumbColor={isTelemetryEnabled ? colors.white : "#f4f3f4"}
                ios_backgroundColor={colors.darkGray}
                onValueChange={() => setIsTelemetryEnabled(!isTelemetryEnabled)}
                value={isTelemetryEnabled}
              />
            </View>

            {/* Backup */}
            <View style={[styles.optionContainer, {height: 1}]}>
              <ThemedText style={styles.optionText}>Backup</ThemedText>
              <Switch
                trackColor={{ false: "#767577", true: colors.lightPink }}
                thumbColor={isBackupEnabled ? colors.white : "#f4f3f4"}
                ios_backgroundColor={colors.darkGray}
                onValueChange={() => setIsBackupEnabled(!isBackupEnabled)}
                value={isBackupEnabled}
              />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Account Settings Section */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionHeaderText}>
              Account Settings
            </ThemedText>

            {/* Edit Profile */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => router.push("./settingsProfile")}
            >
              <ThemedText style={styles.optionText}>Edit Profile</ThemedText>
              <Ionicons name="chevron-forward" size={20} color={colors.black} />
            </TouchableOpacity>

            {/* Dark Mode */}
            <View style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>Dark Mode</ThemedText>
              <Switch
                trackColor={{ false: "#767577", true: colors.lightPink }}
                thumbColor={isDarkModeEnabled ? colors.white : "#f4f3f4"}
                ios_backgroundColor={ colors.darkGray }
                onValueChange={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
                value={isDarkModeEnabled}
              />
            </View>

            {/* Change Date or Scheduling Type */}
            <TouchableOpacity style={styles.optionContainer}>
              <ThemedText
                style={styles.optionText}
                onPress={() => {
                  router.push("/askMenstruate");
                }}
              >
                Change Date or Scheduling Type
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color={colors.black} />
            </TouchableOpacity>
          </View>

          {/* Save Settings Button */}
          <TouchableOpacity style={styles.saveButton} onPress={() => saveSettings()}>
            <ThemedText 
              style={styles.saveButtonText}
              onPress = {() => {saveSettings();}}
            >Save Settings</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

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
    backgroundColor: colors.darkPink,
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it circular
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  settingsText: {
    fontSize: 36,
    color: colors.darkPink,
    fontWeight: "bold",
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
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  userTextContainer: {
    flex: 1,
  },
  userNameText: {
    fontSize: 36,
    color: colors.darkPink,
    fontWeight: "bold",
  },
  userEmailText: {
    fontSize: 15,
    color: colors.black,
  },
  profileIconContainer: {
    backgroundColor: colors.mediumPink, //Light-ish pink used specifically for 
    width: 60,
    height: 60,
    borderRadius: 30, // Circular
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 4,
    backgroundColor: colors.lightPink,
    width: "100%",
    alignSelf: "center",
    marginVertical: 30,
  },
  sectionContainer: {
    marginBottom: 0,
  },
  sectionHeaderText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 15,
    color: colors.black,
    flex: 1,
    flexWrap: "wrap",
  },
  saveButton: {
    backgroundColor: colors.darkPink,
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
