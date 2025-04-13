import { Stack } from "expo-router";
import { setGlobalDarkThemeEnabled } from "@/components/StyleSheet";
import { useEffect, useState } from "react";
import { getSetting } from "@/hooks/useSettings";
import { ColorProvider } from "@/components/ColorContext";
// window.addEventListener = (x: any) => x;
// window.removeEventListener = (x: any) => x;
export default function TabLayout() {
  return (
    <ColorProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ColorProvider>
  );
}
