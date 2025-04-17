import { Platform } from 'react-native';
import { isDevice } from 'expo-device';

import * as Notifications from 'expo-notifications';

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

export function SendNotificationOnDate(title: string, body: string, date: Date) {
  Notifications.scheduleNotificationAsync({
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