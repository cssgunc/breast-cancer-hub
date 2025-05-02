import { Slot, Redirect, Stack } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Protection() {
  const [session, setSession] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSetting("token").then((token) => {
      setSession(token || "");
      getSetting("userId").then((userId) => {
        setUserId(userId || "");
        setIsLoading(false);
      });
    });
  }, []);

  // Don't render anything while still loading
  if (isLoading) {
    return null;
  }

  // After loading, if no session token, redirect to login
  if (session === "" && userId != "local") {
    return <Redirect href="/welcome" />;
  }

  // If we have a session token, render the protected content
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "left", "right", "bottom"]}
    >
      <Slot />
    </SafeAreaView>
  );
}
