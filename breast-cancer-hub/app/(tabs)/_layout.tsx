// app/(tabs)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the default header if you're using custom headers
      }}
    />
  );
}
