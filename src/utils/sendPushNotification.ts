import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";

// NOTE (Francisco Miguel Peralta 2025-07-11): We should improve the type of the product,
// but just for the sake of the example, I'm type the product with the minimum required fields.
export default function sendPushNotification(product: {
  title: string;
  relatedProduct: {
    id: string;
    title: string;
    price: number;
  };
}) {
  const deepLink = Linking.createURL(`product/${product?.relatedProduct?.id}`, {
    scheme: "modak-fran",
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: `You bought ${product?.title}`,
      body: `You may also like ${product?.relatedProduct?.title} for $${product?.relatedProduct?.price}. Press here to buy it.`,
      data: {
        deepLink,
      },
    },
    trigger: null,
  });
}
