import { useNetInfo } from "@react-native-community/netinfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import ErrorLayout from "@/src/components/ErrorLayout";
import useListenForPushNotifications from "@/src/hooks/useListenForPushNotifications";
import useRegisterForPushNotifications from "@/src/hooks/useRegisterForPushNotifications";

export default function App() {
  const { isConnected } = useNetInfo();

  // NOTE (Francisco Miguel Peralta 2025-07-11): Using React Query to improve api calls performance,
  // error handling, and caching.
  // TODO (Francisco Miguel Peralta 2025-07-11): We can also implement some hook to handle the app state
  // the focus of the app, and the network status.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  useRegisterForPushNotifications();
  useListenForPushNotifications();

  if (!isConnected) {
    return (
      <ErrorLayout
        error="No internet, please check you are connected to the internet"
        showCta={false}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Products",
          }}
        />
        <Stack.Screen
          name="product/[productId]"
          options={{
            title: "Product",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
