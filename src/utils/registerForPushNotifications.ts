import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React from "react";

// NOTE (Francisco Miguel Peralta 2025-07-11): This the bare minimum to register for push notifications.
// We can improve this using services like Firebase Cloud Messaging (FCM) or AWS Simple Notification Service (SNS).
// We can also improve the error handling by using a custom error class and some kind of error boundary.

function handleRegistrationError(errorMessage: string) {
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError("Permission not granted to get push token for push notification!");
      return;
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function useRegisterForPushNotifications() {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
}
