import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ErrorLayout({
  error,
  showCta = true,
}: {
  error: string;
  showCta?: boolean;
}) {
  const router = useRouter();

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.errorTitle}>An error occurred</Text>
      <Text style={styles.errorMessage}>Error: {error}</Text>
      {showCta && (
        <TouchableOpacity style={styles.errorButton} onPress={() => router.back()}>
          <Text style={styles.errorButtonText}>Go back to home</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 16,
  },
  errorButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  errorButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
