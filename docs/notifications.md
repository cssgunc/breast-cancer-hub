# Notifications

All functions related to handling "push" notifications (called *in-app* in official documentation because they are scheduled by the app itself, not by a remote server) are in `/app/notifications/notifications.ts` and `/app/_layout.tsx`.

## Scheduling notifications

The function `ScheduleExam` takes in a `Date` object, cancels any existing self-exam notification, and schedules a notification with title and body defined by the consts `EXAM_TITLE` and `EXAM_BODY` at the top of `notifications.ts`.

Cancelling existing notifications works since all self-exam notifications should use the same identifier defined in `ALERT_IDENTIFIER`. This identifier shouldn't be used for any other notifications.

When interacted with, the notification takes the user to the self exam intro. This is done by passing the data in `EXAM_URL_DATA` through the notification, and is handled in `_layout.tsx`.

## Enabling notifications

The app registers itself for notifications in _layout.tsx. The function `initializeNotificationHandler` defines the behavior of the notification. Currently it shows alert, but with no sound or badge.

The icon displayed on the notification is currently set to the BCH ribbon, in `app.json` under:

```
    "notification":{
      "icon": "./assets/images/splash.png"
    },
```

The app must also set up a channel for notifications. in `registerNotifications`. Currently it's only set up for Android.

It should prompt the user to grant it notification permissions if it doesn't already have them.