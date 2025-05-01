import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../../../../components/style/ThemedView";
import { useColors } from "@/components/style/ColorContext";

export function AccountSettingsHeaderComponent() {
  const {colors, globalStyles} = useColors();

  const styles = StyleSheet.create({
    iconWrapper: {
      backgroundColor: colors.lightHighlight,
      borderRadius: 30,
      padding: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40
    },
  });

  return (
    <ThemedView style={globalStyles.header}>
      <TouchableOpacity
        style={styles.iconWrapper}
      >
        <MaterialIcons name="person" size={28} color={colors.darkHighlight} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => router.push("/settings")}
      >
        <MaterialIcons name="settings" size={28} color={colors.darkHighlight} />
      </TouchableOpacity>
    </ThemedView>
  );
}
