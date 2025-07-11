import { Image } from "expo-image";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import ErrorLayout from "@/src/components/ErrorLayout";
import Loader from "@/src/components/Loader";
import { queries } from "@/src/queries";
import sendPushNotification from "@/src/utils/sendPushNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    // NOTE (Francisco Miguel Peralta 2025-07-11): I can assume that the productId is a string because
    // when I'm navigating to the product details screen, the productId is a string.
    // It would be better to use a type guard to ensure that the productId is a string. But just for
    // simplicity, I'm using the as keyword to cast the productId to a string.
    queryFn: () => queries.getProductById(productId as string),
  });

  if (isLoading) {
    return <Loader />;
  }

  // NOTE (Francisco Miguel Peralta 2025-07-11): The API send a not found message when the product is not found.
  const isProductNotFound = product?.message?.includes("not found");
  if (isError || isProductNotFound) {
    return <ErrorLayout error={error?.message || product?.message} />;
  }

  const handleBuyNow = () => {
    // NOTE (Francisco Miguel Peralta 2025-07-11): This is just for the sake of the example, but should
    // create a checkout flow, and then send a push notification to the user.
    sendPushNotification(product);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Image
        source={{ uri: product?.thumbnail }}
        style={styles.productThumbnail}
        contentFit="contain"
      />
      <FlatList
        horizontal
        contentContainerStyle={styles.productImagesContainer}
        data={product?.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.productImage} contentFit="contain" />
        )}
        keyExtractor={(item) => item}
      />
      <Text style={styles.productTitle}>{product?.title}</Text>
      <Text style={styles.productBrand}>{product?.brand}</Text>
      <Text style={styles.productDescription}>{product?.description}</Text>
      <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
        <Text style={styles.buyNowButtonText}>Buy Now - $ {product?.price}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    gap: 16,
  },
  productThumbnail: {
    width: "100%",
    height: 350,
  },
  productImagesContainer: {
    gap: 8,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 16,
  },
  productBrand: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "lightgray",
    borderRadius: 10,
    color: "black",
    alignSelf: "flex-start",
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buyNowButton: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 10,
  },
  buyNowButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
