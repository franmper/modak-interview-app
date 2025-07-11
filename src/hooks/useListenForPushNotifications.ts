import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export default function useListenForPushNotifications() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      // NOTE (Francisco Miguel Peralta 2025-07-11): When the user taps on the notification, we open the
      // deep link to the product related details screen.
      if (response.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
        const { deepLink } = response.notification.request.content.data;
        if (deepLink && typeof deepLink === "string") {
          Linking.openURL(deepLink);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
