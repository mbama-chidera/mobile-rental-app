// app/host/_layout.tsx
import { Stack } from 'expo-router';

export default function HostLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="become-host" />
      <Stack.Screen name="add-property" />
      <Stack.Screen name="edit-property/[id]" />
      <Stack.Screen name="listing-success" />
    </Stack>
  );
}