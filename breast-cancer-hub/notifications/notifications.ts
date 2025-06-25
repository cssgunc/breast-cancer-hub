import { Platform } from "react-native";
import { isDevice } from "expo-device";

import * as Notifications from "expo-notifications";
import { getSetting } from "@/hooks/useSettings";

const ALERT_IDENTIFIER: string = "bch-self-exam-notification-identifier"; // Do not reuse elsewhere
const EXAM_TITLE: string = "Breast Cancer Self-Exam Due";
const EXAM_BODY: string =
  "You are due for a breast self-exam! Tap here to perform your examination.";
const EXAM_URL_DATA: Record<string, any> = { url: "/selfExam/intro" };

const PERIOD_ALERT_IDENTIFIER = "bch-period-reminder-notification-identifier";
const PERIOD_TITLE = "Breast Self-Exam Period Reminder";
const PERIOD_BODY =
  "Have you entered your period start date this month for your self-exam reminder?";

//#region Raw Notification Functions
function _error(msg: string) {
  console.log(msg);
}

export function initializeNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function registerNotifications() {
  //let token;
  if (isDevice) {
    // Set notification channel
    if (Platform.OS === "android" || Platform.OS === "ios") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
        vibrationPattern: [0, 250, 250, 250],
        //lightColor: "#FF231F7C"
      })
        .then
        //(val)=>console.log(val)
        ();
    }

    // Set permission
    const { status: existingStatus, ios: existingIos } =
      await Notifications.getPermissionsAsync();

    if (Platform.OS === "android") {
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        _error("Permission not granted to get push token");
      }
    }

    if (Platform.OS === "ios") {
      let finalStatus = existingIos?.status;
      if (
        finalStatus !== Notifications.IosAuthorizationStatus.AUTHORIZED &&
        finalStatus !== Notifications.IosAuthorizationStatus.EPHEMERAL
      ) {
        const { ios } = await Notifications.requestPermissionsAsync({
          ios: { allowAlert: true },
        });
        finalStatus = ios?.status;
        if (
          finalStatus !== Notifications.IosAuthorizationStatus.AUTHORIZED &&
          finalStatus !== Notifications.IosAuthorizationStatus.EPHEMERAL
        ) {
          _error("Permission not granted to get push token");
        }
      }
    }
  } else {
    console.log("Not a physical device. Cannot use push notifications");
    alert("Not a physical device. Cannot use push notifications");
  }
}

//#region General
/**
 * Schedule a local notification to display on a given date.
 * @param title Title
 * @param body Text body of notification
 * @param baseDate Date (date object)
 * @param baseIdentifier String identifier to use later
 */
async function ScheduleNotificationsOnDate(
  title: string,
  body: string,
  baseDate: Date,
  data: Record<string, any> = {},
  identifier: string = ""
) {
  if (Platform.OS === "web") return;

  const enabledTimes = await getNotificationTimes(baseDate);
  for (const date of enabledTimes) {
    console.log(`scheduling notification: ${date}`);
    await Notifications.scheduleNotificationAsync({
      identifier: `${identifier}-${date.getTime()}`,
      content: {
        title: title,
        body: body,
        data: data,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: date,
      },
    });
  }
}

async function CancelSelfExamNotifications() {
  if (Platform.OS === "web") return;
  const existing = await Notifications.getAllScheduledNotificationsAsync();
  const selfExamNotifications = existing.filter(({ identifier }) =>
    identifier?.startsWith(ALERT_IDENTIFIER)
  );
  console.log(
    selfExamNotifications.length,
    "self-exam notifications found while cancelling self exams"
  );
  for (const { identifier } of selfExamNotifications) {
    console.log(`cancelling ${identifier}`);
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }
}

export async function CancelPeriodReminderNotifications() {
  if (Platform.OS === "web") return;
  const existing = await Notifications.getAllScheduledNotificationsAsync();
  const periodNotifications = existing.filter(({ identifier }) =>
    identifier?.startsWith(PERIOD_ALERT_IDENTIFIER)
  );
  console.log(
    periodNotifications.length,
    "period reminder notifications found while cancelling period reminders"
  );
  for (const { identifier } of periodNotifications) {
    console.log(`cancelling ${identifier}`);
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }
}

//#region Helpers
async function getNotificationTimes(scheduledDate: Date) {
  if ((await getSetting("usePushNotifications")) === false) {
    return [];
  }
  const notificationTimes = await getSetting("notificationTimes");
  const enabledTimes = notificationTimes.filter((n) => {
    return n.enabled;
  });
  const dates: Date[] = enabledTimes.map((t) => {
    return new Date(
      scheduledDate.getFullYear(),
      scheduledDate.getMonth(),
      scheduledDate.getDate(),
      t.hour,
      t.minute
    );
  });
  return dates;
}

//#region Specific Notifications

// Schedules a reminder next month on the same day as the previous month's timestamp.
// Replaces previous notification.
export async function SchedulePeriodReminderNotifications(
  lastPeriodDate?: Date // Date of last period start
) {
  if (Platform.OS === "web") return;
  await CancelPeriodReminderNotifications();

  if (lastPeriodDate) {
    // Schedule for the same day next month, at each enabled time
    const nextMonth = new Date(lastPeriodDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await ScheduleNotificationsOnDate(
      PERIOD_TITLE,
      PERIOD_BODY,
      nextMonth,
      { url: "/calendar" },
      PERIOD_ALERT_IDENTIFIER
    );
  }
}

// Schedule a notification for self exam on given date. Replaces previous notification.
export async function ScheduleExamNotifications(
  date: Date // Date of self exam
) {
  if (Platform.OS === "web") return;
  await CancelSelfExamNotifications();
  await ScheduleNotificationsOnDate(
    EXAM_TITLE,
    EXAM_BODY,
    date,
    EXAM_URL_DATA,
    ALERT_IDENTIFIER
  );
}
