import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { saveSetting } from "@/hooks/useSettings";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors, globalStyles } = useColors();

  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  const TIME_FORMAT_OPTIONS: {
    hour: "2-digit" | "numeric" | undefined;
    minute: "2-digit" | "numeric" | undefined;
  } = { hour: "2-digit", minute: "2-digit" };

  const [loaded, setLoaded] = useState(false);

  // State for checkboxes
  const [pushNotifications, setPushNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);

  const [locale, setLocale] = useState("en-US");

  const [date, setDate] = useState(new Date());
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [alarmToDelete, setAlarmToDelete] = useState(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // State for time entries
  const [timeEntries, setTimeEntries] = useState<
    { id: number; time: Date; displayTime: string; enabled: boolean }[]
  >([]);

  const fixTempLocaleToUS = (locale: string) => {
    return locale === "temp" ? "en-us" : locale;
  };

  // async function saveSettingsToBackend() {
  //   console.log(
  //     (
  //       timeEntries as {
  //         id: number;
  //         time: Date;
  //         displayTime: string;
  //         enabled: boolean;
  //       }[]
  //     ).map((val) => {
  //       return [person.userId, val.displayTime, val.enabled];
  //     })
  //   );
  //   fetch(`${BASE_URL}/settings` + "?user_id=" + person.userId, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-session-token": person.token,
  //       "x-user-email": person.email,
  //     },
  //     body: JSON.stringify({
  //       user_id: person.userId,
  //       use_in_app_notifications: inAppNotifications,
  //       use_push_notifications: pushNotifications,
  //       notification_times: timeEntries,
  //     }),
  //   }).then((res) => {
  //     console.log(res.status);
  //   });
  // }

  // // Fetching information from local storage for API call
  // useEffect(() => {
  //   getSetting("name").then((name) =>
  //     getSetting("email").then((email) =>
  //       getSetting("token").then((token) =>
  //         getSetting("userId").then((userId) => {
  //           setPerson({ name, email, token, userId });
  //         })
  //       )
  //     )
  //   );
  // }, []);

  // const [person, setPerson] = useState({
  //   name: "",
  //   email: "",
  //   token: "",
  //   userId: "",
  // });

  // Making an API call to read user settings.
  useEffect(() => {
    getSetting("useInAppNotifications").then((inapp) => {
      getSetting("usePushNotifications").then((push) => {
        getSetting("notificationTimes").then((times) => {
          getSetting("locale").then((locale) => {
            setInAppNotifications(inapp);
            setPushNotifications(push);
            setLocale(fixTempLocaleToUS(locale));
            setTimeEntries(times);
            setLoaded(true);
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveNotificationSettings();
  }, [loaded, pushNotifications, inAppNotifications, timeEntries]);

  //Save notification preferences to local storage
  const saveNotificationSettings = async () => {
    // if (!pushNotifications && !inAppNotifications) {
    //   alert("At least one notification type must be selected.");
    //   return;
    // }

    await saveSetting("usePushNotifications", pushNotifications);
    await saveSetting("useInAppNotifications", inAppNotifications);
    await saveSetting("notificationTimes", timeEntries);

    //await saveSettingsToBackend();

    //alert("Settings saved successfully.");
  };

  // Function to add a new time entry
  const addTimeEntry = (newDate: Date) => {
    // console.log(newDate);
    const newEntry = {
      id: Date.now(),
      time: newDate,
      displayTime: newDate.toLocaleTimeString(locale, TIME_FORMAT_OPTIONS),
      enabled: true,
    };

    // If an entry already exists with the same hour/minute, don't allow creating the duplicate
    let overlap: boolean = false;
    for (let i = 0; i < timeEntries.length; i++) {
      if (newEntry.displayTime == timeEntries[i].displayTime) {
        overlap = true;
        break;
      }
    }

    if (overlap) {
      alert("Time already exists!");
    } else {
      setTimeEntries([newEntry, ...timeEntries]);
    }
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
    optionDescription: {
      marginTop: 10,
    },
    divider: {
      height: 4,
      backgroundColor: colors.lightHighlight,
      width: "100%",
      alignSelf: "center",
      marginVertical: 30,
    },
    selectTimesText: {
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
      borderColor: colors.darkHighlight,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
    },
    addTimeText: {
      fontSize: 16,
      color: colors.darkHighlight,
      marginLeft: 10,
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: colors.white,
      width: "80%",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
    },
    closeButton: {
      alignSelf: "flex-end",
    },
    modalTitle: {
      marginBottom: 20,
    },
    modalButton: {
      paddingHorizontal: 20,
      marginBottom: 10,
      marginHorizontal: 10,
      width: "auto",
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
        {/* Notifications Text */}
        <ThemedText type="title" colored style={styles.headerTitle}>
          Notifications
        </ThemedText>
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

          {/* In-App Notifications Option */}
          <TouchableOpacity
            style={styles.optionBox}
            onPress={async () => {
              await setInAppNotifications(!inAppNotifications);
            }}
            disabled
          >
            <View style={styles.optionHeader}>
              <View style={styles.checkboxContainer}>
                {inAppNotifications ? (
                  <Ionicons
                    name="checkbox"
                    size={24}
                    color={colors.lightHighlight}
                  />
                ) : (
                  <Ionicons
                    name="square-outline"
                    size={24}
                    color={colors.darkHighlight}
                  />
                )}
              </View>
              <ThemedText colored bold>
                Notification While in App
              </ThemedText>
            </View>
            <ThemedText type="caption" style={styles.optionDescription}>
              The app will display a notification when you open it.
            </ThemedText>
          </TouchableOpacity>

          {/* Push Notifications Option */}

          <TouchableOpacity
            style={styles.optionBox}
            onPress={async () => {
              await setPushNotifications(!pushNotifications);
            }}
          >
            <View style={styles.optionHeader}>
              <View style={styles.checkboxContainer}>
                {pushNotifications ? (
                  <Ionicons
                    name="checkbox"
                    size={24}
                    color={colors.darkHighlight}
                  />
                ) : (
                  <Ionicons
                    name="square-outline"
                    size={24}
                    color={colors.darkHighlight}
                  />
                )}
              </View>
              <ThemedText colored bold>
                Push Notifications
              </ThemedText>
            </View>
            <ThemedText type="caption" style={styles.optionDescription}>
              This device will receive notifications that will be from any
              screen.{"\n"}
              It will be visible to anyone.
            </ThemedText>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Time Section */}
          <ThemedText style={styles.sectionHeaderText}>Time</ThemedText>
          <ThemedText style={styles.sectionSubText2}>
            When would you like to be notified?
          </ThemedText>
          <ThemedText type="caption" italic style={styles.selectTimesText}>
            Select times
          </ThemedText>

          {/* Time Entries */}
          {timeEntries.map((entry) => (
            <View key={entry.id} style={styles.timeEntryBox}>
              <View style={styles.timeEntryLeft}>
                <View style={styles.timeRow}>
                  <ThemedText style={styles.timeText}>
                    {entry.displayTime}
                  </ThemedText>
                </View>
                <ThemedText style={styles.alarmText}>Alarm</ThemedText>
              </View>
              <View style={styles.timeEntryRight}>
                <Switch
                  value={entry.enabled}
                  onValueChange={() => toggleTimeEntry(entry.id)}
                  trackColor={{
                    false: colors.backgroundGray,
                    true: colors.darkHighlight,
                  }}
                  thumbColor={colors.white}
                />
                <TouchableOpacity
                  onPress={() => {
                    setAlarmToDelete(entry.id);
                    setDeleteModalVisible(true);
                  }}
                >
                  <MaterialIcons name="delete" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add Time Button */}
          <TouchableOpacity
            style={styles.addTimeButton}
            onPress={() => setTimePickerVisible(true)}
          >
            <Ionicons
              name="add-circle"
              size={24}
              color={colors.darkHighlight}
            />
            <ThemedText style={styles.addTimeText}>Add Time</ThemedText>
          </TouchableOpacity>

          {/* Save Settings Button */}
          {/* <ThemedButton onPress={saveNotificationSettings}>
            Save Settings
          </ThemedButton> */}
        </View>
      </ScrollView>
      {timePickerVisible && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          positiveButton={{ label: "Add", textColor: colors.darkHighlight }}
          negativeButton={{ label: "Cancel", textColor: colors.darkHighlight }}
          onChange={(event, selectedDate) => {
            if (event.type == "set" && selectedDate) {
              setDate(selectedDate);
              // console.log(selectedDate);
              addTimeEntry(selectedDate);
            } else setDate(new Date());
            setTimePickerVisible(false);
          }}
        />
      )}

      <Modal
        visible={deleteModalVisible}
        style={styles.modalOverlay}
        transparent
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDeleteModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <ThemedText type="heading" colored style={styles.modalTitle}>
                  Delete Alarm?
                </ThemedText>
                <View style={{ flexDirection: "row", width: "auto" }}>
                  <ThemedButton
                    variant="secondary"
                    style={styles.modalButton}
                    onPress={() => setDeleteModalVisible(false)}
                  >
                    Cancel
                  </ThemedButton>
                  <ThemedButton
                    style={styles.modalButton}
                    onPress={() => {
                      setDeleteModalVisible(false);
                      removeTimeEntry(alarmToDelete);
                    }}
                  >
                    Delete
                  </ThemedButton>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
}
