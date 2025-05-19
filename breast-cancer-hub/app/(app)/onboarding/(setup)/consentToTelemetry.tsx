import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { saveSetting } from "@/hooks/useSettings";
import { useState } from "react";
import { View, Switch } from "react-native";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";

export default function ConsentToTelemetry() {
  const [telemetryEnabled, setTelemetryEnabled] = useState(false);
  const { colors, globalStyles } = useColors();

  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Telemetry & Data</ThemedText>
        <ThemedText>Collection</ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedText>
        {/* Placeholder content — adapt as needed */}
        We would like to collect limited, anonymous usage data to help us
        improve this app and provide a better experience. Your data will remain
        private, and you can opt out at any time.
      </ThemedText>
      <View style={globalStyles.settingsButton}>
        <ThemedText type="default" bold>
          {telemetryEnabled ? "Currently Opted In" : "Currently Opted Out"}
        </ThemedText>
        <Switch
          trackColor={{ false: "#767577", true: colors.lightHighlight }}
          thumbColor={telemetryEnabled ? colors.white : "#f4f3f4"}
          ios_backgroundColor={colors.darkGray}
          onValueChange={(value) => {
            setTelemetryEnabled(value);
            saveSetting("useTelemetry", value);
          }}
          value={telemetryEnabled}
        />
      </View>
    </>
  );
}
