import { Slot, Redirect } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import { useState, useEffect } from "react";
import { View } from "react-native";
import LoadingScreen from "@/components/Loading";
import { CheckupProvider } from "@/hooks/CheckupContext";
import { PeriodProvider } from "@/hooks/PeriodContext";

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
    return <LoadingScreen />;
  }

  console.log("Protection:", { session, userId });

  //After loading, if no session token, redirect to login
  if (session === "" && userId != "local") {
    return <Redirect href="/welcome" />;
  }

  // If we have a session token, render the protected content
  return (
    <View style={{ flex: 1 }}>
      <CheckupProvider>
        <PeriodProvider>
          <Slot />
        </PeriodProvider>
      </CheckupProvider>
    </View>
  );
}
