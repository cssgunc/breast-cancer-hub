import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { View, Switch } from "react-native";
import { onboardingStyles } from "..";
import { useColors } from "@/components/style/ColorContext";
export default function ChooseColorScheme() {
  const { colors, globalStyles, setDarkMode, darkMode } = useColors();

  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Choose Your</ThemedText>
        <ThemedText type="title" colored>
          Color Theme
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedView style={onboardingStyles.bodyContainer}>
        <ThemedView style={globalStyles.settingsButton}>
          <ThemedText type="default" bold colored>
            Pink
          </ThemedText>
          <Switch
            trackColor={{ false: "#767577", true: colors.lightHighlight }}
            thumbColor={darkMode ? colors.white : "#f4f3f4"}
            ios_backgroundColor={colors.darkGray}
            onValueChange={(value) => {
              setDarkMode(value);
            }}
            value={darkMode}
          />
          <ThemedText type="default" bold colored>
            Indigo
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}
