import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { useState } from "react";
import { View, Switch } from "react-native";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";
export default function ChooseColorScheme() {
  const [IsDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false);
  const { colors, globalStyles, setDarkMode } = useColors();

  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Choose Your</ThemedText>
        <ThemedText
          type="title"
          colored
          style={onboardingStyles.highlightedTitleText}
        >
          Color Theme
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <View style={globalStyles.settingsButton}>
        <ThemedText type="default" bold colored>
          Pink
        </ThemedText>
        <Switch
          trackColor={{ false: "#767577", true: colors.lightHighlight }}
          thumbColor={IsDarkThemeEnabled ? colors.white : "#f4f3f4"}
          ios_backgroundColor={colors.darkGray}
          onValueChange={() => {
            setDarkMode(!IsDarkThemeEnabled);
            setIsDarkThemeEnabled(!IsDarkThemeEnabled);
          }}
          value={IsDarkThemeEnabled}
        />
        <ThemedText type="default" bold colored>
          Indigo
        </ThemedText>
      </View>
    </>
  );
}
