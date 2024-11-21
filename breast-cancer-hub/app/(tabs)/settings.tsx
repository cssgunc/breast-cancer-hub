import React from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  const [isTelemetryEnabled, setIsTelemetryEnabled] = React.useState(false);
  const [isBackupEnabled, setIsBackupEnabled] = React.useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);

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
              <ThemedText style={styles.userNameText}>Jane Doe</ThemedText>
              <ThemedText style={styles.userEmailText}>janedoe43@gmail.com</ThemedText>
            </View>
            {/* Profile Icon */}
            <View style={styles.profileIconContainer}>
              <Ionicons name="person" size={36} color="#E93C92" />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* General Section */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionHeaderText}>General</ThemedText>

            {/* Notification Preferences */}
            <TouchableOpacity 
              style={styles.optionContainer}
              onPress={() => router.push('./settingsNotifications')}
            >
              <ThemedText style={styles.optionText}>Notification Preferences</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            {/* Change Self Examination Language */}
            <TouchableOpacity style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>Change Self Examination Language</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            {/* Telemetry */}
            <View style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>Telemetry</ThemedText>
              <Switch
                trackColor={{ false: '#767577', true: '#EFCEE6' }}
                thumbColor={isTelemetryEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsTelemetryEnabled(!isTelemetryEnabled)}
                value={isTelemetryEnabled}
              />
            </View>

            {/* Backup */}
            <View style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>Backup</ThemedText>
              <Switch
                trackColor={{ false: '#767577', true: '#EFCEE6' }}
                thumbColor={isBackupEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsBackupEnabled(!isBackupEnabled)}
                value={isBackupEnabled}
              />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Account Settings Section */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionHeaderText}>Account Settings</ThemedText>

            {/* Edit Profile */}
            <TouchableOpacity 
              style={styles.optionContainer}
              onPress={() => router.push('./settingsProfile')}
            >
              <ThemedText style={styles.optionText}>Edit Profile</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>

            {/* Dark Mode */}
            <View style={styles.optionContainer}>
              <ThemedText style={styles.optionText}>Dark Mode</ThemedText>
              <Switch
                trackColor={{ false: '#767577', true: '#EFCEE6' }}
                thumbColor={isDarkModeEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
                value={isDarkModeEnabled}
              />
            </View>

            {/* Change Date or Scheduling Type */}
            <TouchableOpacity 
              style={styles.optionContainer}
              onPress={() => router.push('./AskMenstruate')}
            >
              <ThemedText style={styles.optionText}>Change Date or Scheduling Type</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Save Settings Button */}
          <TouchableOpacity style={styles.saveButton}>
            <ThemedText style={styles.saveButtonText}>Save Settings</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7FD', // Background color of the page
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#E93C92',
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it circular
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  settingsText: {
    fontSize: 36,
    color: '#E93C92',
    fontWeight: 'bold',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  mainContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  userTextContainer: {
    flex: 1,
  },
  userNameText: {
    fontSize: 36,
    color: '#E93C92',
    fontWeight: 'bold',
  },
  userEmailText: {
    fontSize: 15,
    color: 'black',
  },
  profileIconContainer: {
    backgroundColor: '#F5C4DC',
    width: 60,
    height: 60,
    borderRadius: 30, // Circular
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 4,
    backgroundColor: '#EFCEE6',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 30,
  },
  sectionContainer: {
    marginBottom: 0,
  },
  sectionHeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 15,
    color: 'black',
    flex: 1,
    flexWrap: 'wrap',
  },
  saveButton: {
    backgroundColor: '#E93C92',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 50,
  },
  saveButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

