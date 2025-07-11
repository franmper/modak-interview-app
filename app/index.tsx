import { useInfiniteQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Loader from "@/src/components/Loader";
import { queries } from "@/src/queries";
import ErrorLayout from "@/src/components/ErrorLayout";

export default function HomeScreen() {
  const { data, isError, isLoading, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => queries.getProducts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => allPages.flat().length + 10,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorLayout error={error.message} />;
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={data?.pages.flat()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`}>
            <View style={styles.productContainer}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.productImage}
                contentFit="cover"
              />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>$ {item.price}</Text>
              <Text style={styles.cta}>Press for more</Text>
            </View>
          </Link>
        )}
        onEndReached={() => fetchNextPage()}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    gap: 10,
    margin: 10,
  },
  productContainer: {
    gap: 8,
    alignItems: "center",
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
  },
  cta: {
    fontSize: 12,
  },
  footer: {
    margin: 10,
    alignItems: "center",
  },
});
