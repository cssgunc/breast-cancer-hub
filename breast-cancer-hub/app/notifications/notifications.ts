import { Platform } from 'react-native';
import { isDevice } from 'expo-device';

import * as Notifications from 'expo-notifications';

const ALERT_IDENTIFIER : string = "alert-identifier-DO-NOT-REUSE-ELSEWHERE";

function _error(msg: string) {
  console.log(msg);
  alert(msg);
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
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        'name': 'default',
        'importance': Notifications.AndroidImportance.HIGH,
        //vibrationPattern: [0, 250, 250, 250],
        //lightColor: "#FF231F7C"
      }).then((val)=>console.log(val));
    }

    // Set permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      _error("Permission not granted to get push token")
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
async function ScheduleNotificationOnDate(title: string, body: string, date: Date, identifier: string = "") {
  return await Notifications.scheduleNotificationAsync({
    identifier: identifier,
    content: {
      title: title,
      body: body,
      
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
export async function ScheduleExam(date: Date) {
  CancelNotification(ALERT_IDENTIFIER).then(() => {
    ScheduleNotificationOnDate("exam title", "exam body", date, ALERT_IDENTIFIER);
  })
}

// async function CancelAllNotifications() {
//   await Notifications.cancelAllScheduledNotificationsAsync();
// }

/**
 * 
 * @param identifier Identifier returned by scheduleNotificationAsync, used to cancel.
 */
async function CancelNotification(identifier: string) {
  await Notifications.cancelScheduledNotificationAsync(identifier);
}

export async function DismissNotifications() {
  await Notifications.dismissAllNotificationsAsync();
}