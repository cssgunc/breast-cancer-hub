import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { saveSetting } from "@/hooks/useSettings";
import { push } from "expo-router/build/global-state/routing";
import { colors } from "@/components/StyleSheet";
import { getSetting, saveSetting } from "@/hooks/useSettings";

export default function NotificationsScreen() {
  const router = useRouter();

  // State for checkboxes
  const [pushNotifications, setPushNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(false);

  // State for time entries
  const [timeEntries, setTimeEntries] = useState<
    { id: number; time: string; period: string; enabled: boolean }[]
  >([]);

  async function saveSettingsToBackend() {
    fetch("http://localhost:3000/settings" + "?user_id=" + person.userId, {
      method: "PUT", 
      headers: {
        "Content-Type" : "application/json",
        "x-session-token": person.token,
        'x-user-email' : person.email,
        },
        body: JSON.stringify({user_id: person.userId, use_in_app_notifications: inAppNotifications, use_push_notifications: pushNotifications})
      })
  }

  // Fetching information from local storage for API call
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
  
  // Making an API call to read user settings.
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
            console.log(data);
            setInAppNotifications(data.settings.use_in_app_notifications);
            setPushNotifications(data.settings.use_push_notifications);
          })
          .catch(error => console.error(error));
      }
    }, [person.token]);
    
  // Save notification preferences to local storage
  const saveNotificationSettings = async () => {
    if (!pushNotifications && !inAppNotifications) {
      alert("At least one notification type must be selected.");
      return;
    }

    await saveSetting("usePushNotifications", pushNotifications);
    await saveSetting("useInAppNotifications", inAppNotifications);
    
    await saveSettingsToBackend();
    
    alert("Settings saved successfully.");
  };

  // Function to add a new time entry
  const addTimeEntry = () => {
    const newEntry = {
      id: Date.now(),
      time: "8:00",
      period: "PM" as "AM" | "PM",
      enabled: true,
    };
    setTimeEntries([newEntry, ...timeEntries]);
  };

  // Function to remove a time entry
  const removeTimeEntry = (id: number) => {
    setTimeEntries(timeEntries.filter((entry) => entry.id !== id));
  };

  // Function to toggle time entry enabled state
  const toggleTimeEntry = (id: number) => {
    setTimeEntries(
      timeEntries.map((entry) =>
        entry.id === id ? { ...entry, enabled: !entry.enabled } : entry
      )
    );
  };

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
        {/* Notifications Text */}
        <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Main White Rounded Rectangle */}
        <View style={styles.mainContainer}>
          {/* Alerts Section */}
          <ThemedText style={styles.sectionHeaderText}>Alerts</ThemedText>
          <ThemedText style={styles.sectionSubText1}>
            How would you like to be notified when a self-examination is due?
          </ThemedText>

          {/* Push Notifications Option */}
          <View style={styles.optionBox}>
            <View style={styles.optionHeader}>
              <TouchableOpacity
                onPress={() => setPushNotifications(!pushNotifications)}
                style={styles.checkboxContainer}
              >
                {pushNotifications ? (
                  <Ionicons name="checkbox" size={24} color={colors.darkPink} />
                ) : (
                  <Ionicons name="square-outline" size={24} color={colors.darkPink} />
                )}
              </TouchableOpacity>
              <ThemedText style={styles.optionTitle}>
                Push Notifications
              </ThemedText>
            </View>
            <ThemedText style={styles.optionDescription}>
              This device will receive notifications that will be from any
              screen.{"\n"}
              It will be visible to anyone.
            </ThemedText>
          </View>

          {/* In-App Notifications Option */}
          <View style={styles.optionBox}>
            <View style={styles.optionHeader}>
              <TouchableOpacity
                onPress={() => setInAppNotifications(!inAppNotifications)}
                style={styles.checkboxContainer}
              >
                {inAppNotifications ? (
                  <Ionicons name="checkbox" size={24} color={colors.darkPink} />
                ) : (
                  <Ionicons name="square-outline" size={24} color={colors.darkPink} />
                )}
              </TouchableOpacity>
              <ThemedText style={styles.optionTitle}>
                Notification While in App
              </ThemedText>
            </View>
            <ThemedText style={styles.optionDescription}>
              The app will display a notification when you open it.
            </ThemedText>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Time Section */}
          <ThemedText style={styles.sectionHeaderText}>Time</ThemedText>
          <ThemedText style={styles.sectionSubText2}>
            When would you like to be notified?
          </ThemedText>
          <ThemedText style={styles.selectTimesText}>Select times</ThemedText>

          {/* Time Entries */}
          {timeEntries.map((entry) => (
            <View key={entry.id} style={styles.timeEntryBox}>
              <View style={styles.timeEntryLeft}>
                <View style={styles.timeRow}>
                  <ThemedText style={styles.timeText}>{entry.time}</ThemedText>
                  <ThemedText style={styles.periodText}>
                    {entry.period}
                  </ThemedText>
                </View>
                <ThemedText style={styles.alarmText}>Alarm</ThemedText>
              </View>
              <View style={styles.timeEntryRight}>
                <Switch
                  value={entry.enabled}
                  onValueChange={() => toggleTimeEntry(entry.id)}
                  trackColor={{ false: colors.backgroundGray, true: colors.darkPink }}
                  thumbColor={colors.white}
                />
                <TouchableOpacity onPress={() => removeTimeEntry(entry.id)}>
                  <MaterialIcons name="delete" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add Time Button */}
          <TouchableOpacity style={styles.addTimeButton} onPress={addTimeEntry}>
            <Ionicons name="add-circle" size={24} color={colors.darkPink} />
            <ThemedText style={styles.addTimeText}>Add Time</ThemedText>
          </TouchableOpacity>

          {/* Save Settings Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveNotificationSettings}>
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
  headerTitle: {
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
  sectionHeaderText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionSubText1: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 15,
  },
  sectionSubText2: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
  },
  optionBox: {
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  optionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkPink,
  },
  optionDescription: {
    fontSize: 15,
    color: colors.mediumGray,
    marginTop: 10,
    lineHeight: 20,
  },
  divider: {
    height: 4,
    backgroundColor: colors.lightPink,
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
  timeEntryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  timeEntryLeft: {
    flex: 1,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  timeText: {
    fontSize: 15,
    color: colors.black,
    marginRight: 5,
  },
  periodText: {
    fontSize: 15,
    color: colors.black,
  },
  alarmText: {
    fontSize: 12,
    color: colors.mediumGray,
    marginTop: 5,
  },
  timeEntryRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  addTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.darkPink,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  addTimeText: {
    fontSize: 16,
    color: colors.darkPink,
    marginLeft: 10,
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
