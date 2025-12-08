// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../store';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  fade: true
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="property/[id]" />
          <Stack.Screen name="booking/index" />
          <Stack.Screen name="booking/success" />
          <Stack.Screen name="host/become-host" />
          <Stack.Screen name="host/add-property" />
          <Stack.Screen name="host/edit-property/[id]" /> {/* ADD THIS LINE */}
          <Stack.Screen name="host/listing-success" />
          <Stack.Screen name="profile/my-listings" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}