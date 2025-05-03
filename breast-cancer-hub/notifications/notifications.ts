import { Platform } from "react-native";
import { isDevice } from "expo-device";

import * as Notifications from "expo-notifications";

const ALERT_IDENTIFIER: string = "alert-identifier-DO-NOT-REUSE-ELSEWHERE";
const EXAM_TITLE: string = "Breast Cancer Self-Exam";
const EXAM_BODY: string =
  "You are due for a breast self-exam! Tap here to perform your examination.";
const EXAM_URL_DATA: Record<string, any> = { url: "/selfExam" };

function _error(msg: string) {
  console.log(msg);
  //alert(msg);
}

export function initializeNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
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
        //vibrationPattern: [0, 250, 250, 250],
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
/**
 * Schedule a local notification to display on a given date.
 * @param title Title
 * @param body Text body of notification
 * @param date Date (date object)
 * @param identifier String identifier to use later
 * @returns identifier: String identifier, in case its needed to cancel later
 */
async function ScheduleNotificationOnDate(
  title: string,
  body: string,
  date: Date,
  data: Record<string, any> = {},
  identifier: string = ""
) {
  if (Platform.OS === "web") {
    return;
  }

  console.log(`scheduling ${date}`);
  return await Notifications.scheduleNotificationAsync({
    identifier: identifier,
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: date,
    },
  });
}

/**
 * Schedule a notification for self exam on given date. Replaces previous notification.
 */
export async function ScheduleExam(dates: Date[]) {
  CancelNotifications(ALERT_IDENTIFIER).then(() => {
    for (let date of dates) {
      ScheduleNotificationOnDate(
        EXAM_TITLE,
        EXAM_BODY,
        date,
        EXAM_URL_DATA,
        ALERT_IDENTIFIER
      );
    }
  });
}

// async function CancelAllNotifications() {
//   await Notifications.cancelAllScheduledNotificationsAsync();
// }

/**
 *
 * @param identifier Identifier returned by scheduleNotificationAsync, used to cancel.
 */
async function CancelNotifications(identifier: string) {
  if (Platform.OS === "web") {
    return;
  }
  const existing = await Notifications.getAllScheduledNotificationsAsync();
  for (const { identifier } of existing) {
    if (identifier?.startsWith(ALERT_IDENTIFIER)) {
      console.log(`cancelling ${identifier}`);
      await Notifications.cancelScheduledNotificationAsync(identifier);
    }
  }
}

export async function DismissNotifications() {
  await Notifications.dismissAllNotificationsAsync();
}
