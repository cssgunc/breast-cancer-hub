import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  Modal,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting, NotificationTime } from "@/hooks/useSettings";
import { saveSetting } from "@/hooks/useSettings";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";
import { useCheckupData } from "@/hooks/CheckupContext";
import { formatHMTime } from "@/constants/dateTimeUtils";

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors } = useColors();

  const { rescheduleNotifications } = useCheckupData();

  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const [locale, setLocale] = useState("en-US");

  const [pendingDate, setPendingDate] = useState(new Date());
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [alarmToDelete, setAlarmToDelete] = useState(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [timeEntries, setTimeEntries] = useState<NotificationTime[]>([]);

  useEffect(() => {
    const loadSettings = async () => {
      const [inapp, push, times, locale] = await Promise.all([
        getSetting("useInAppNotifications"),
        getSetting("usePushNotifications"),
        getSetting("notificationTimes"),
        getSetting("locale"),
      ]);
      setInAppNotifications(inapp);
      setPushNotificationsEnabled(push);
      setLocale(locale);
      setTimeEntries(times);
    };
    loadSettings();
  }, []);

  const handleTogglePushNotifications = async () => {
    setPushNotificationsEnabled((prev) => {
      const newValue = !prev;
      saveSetting("usePushNotifications", newValue).then(
        rescheduleNotifications
      );
      return newValue;
    });
  };

  // Function to add a new time entry
  const addTimeEntry = async (newDate: Date) => {
    const newEntry: NotificationTime = {
      id: Date.now(),
      hour: newDate.getHours(),
      minute: newDate.getMinutes(),
      enabled: true,
    };

    // If an entry already exists with the same hour/minute, don't allow creating the duplicate
    let overlap: boolean = false;
    for (let i = 0; i < timeEntries.length; i++) {
      if (
        newEntry.hour === timeEntries[i].hour &&
        newEntry.minute === timeEntries[i].minute
      ) {
        overlap = true;
        break;
      }
    }

    if (overlap) {
      alert("Time already exists!");
    } else {
      const updated = [newEntry, ...timeEntries];
      setTimeEntries(updated);
      await saveSetting("notificationTimes", updated);
      rescheduleNotifications();
    }
  };

  // Function to remove a time entry
  const removeTimeEntry = async (id: number) => {
    const updated = timeEntries.filter((entry) => entry.id !== id);
    setTimeEntries(updated);
    await saveSetting("notificationTimes", updated);
    rescheduleNotifications();
  };

  // Function to toggle time entry enabled state
  const toggleTimeEntry = (id: number) => {
    const updated = timeEntries.map((entry) =>
      entry.id === id ? { ...entry, enabled: !entry.enabled } : entry
    );
    setTimeEntries(updated);
    saveSetting("notificationTimes", updated).then(rescheduleNotifications);
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
              The app will display a reminder when you open it.
            </ThemedText>
          </TouchableOpacity>

          {/* Push Notifications Option */}

          <TouchableOpacity
            style={styles.optionBox}
            onPress={handleTogglePushNotifications}
          >
            <View style={styles.optionHeader}>
              <View style={styles.checkboxContainer}>
                {pushNotificationsEnabled ? (
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
              This device will receive a scheduled push notification, even
              outside the app.
              {"\n"}
              It will be visible to anyone viewing the screen.
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
                    {formatHMTime(entry.hour, entry.minute, locale)}
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
            onPress={() => {
              setPendingDate(new Date());
              setTimePickerVisible(true);
            }}
          >
            <Ionicons
              name="add-circle"
              size={24}
              color={colors.darkHighlight}
            />
            <ThemedText style={styles.addTimeText}>Add Time</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* iOS: picker modal (avoids defaulting to minimized) */}
      {Platform.OS === "ios" && (
        <Modal
          visible={timePickerVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setTimePickerVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setTimePickerVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <ThemedText
                    type="heading"
                    colored
                    style={{ marginBottom: 20 }}
                  >
                    Select Time
                  </ThemedText>
                  <RNDateTimePicker
                    value={pendingDate}
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setPendingDate(selectedDate);
                      }
                    }}
                    style={{ width: 250 }}
                  />
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <ThemedButton
                      variant="secondary"
                      style={{ marginRight: 10 }}
                      onPress={() => setTimePickerVisible(false)}
                    >
                      Cancel
                    </ThemedButton>
                    <ThemedButton
                      onPress={() => {
                        addTimeEntry(pendingDate);
                        setTimePickerVisible(false);
                      }}
                    >
                      Add
                    </ThemedButton>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {/* Android: native modal picker (always overlays app) */}
      {Platform.OS === "android" && timePickerVisible && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={pendingDate}
          mode="time"
          display="clock"
          positiveButton={{ label: "Add", textColor: colors.darkHighlight }}
          negativeButton={{ label: "Cancel", textColor: colors.darkHighlight }}
          onChange={(event, selectedDate) => {
            if (event.type === "set" && selectedDate) {
              setPendingDate(selectedDate);
              addTimeEntry(selectedDate);
              setTimePickerVisible(false);
            } else if (event.type === "dismissed") {
              setTimePickerVisible(false);
            }
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
