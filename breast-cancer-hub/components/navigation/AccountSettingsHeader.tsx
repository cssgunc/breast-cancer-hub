import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../style/ThemedView";
import { useColors } from "@/components/style/ColorContext";
import { Image } from "react-native";
export default function AccountSettingsHeaderComponent() {
  const { colors, globalStyles } = useColors();

  const styles = StyleSheet.create({
    iconWrapper: {
      backgroundColor: colors.lightHighlight,
      borderRadius: 30,
      padding: 8,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <ThemedView style={globalStyles.header}>
      {/* <TouchableOpacity style={styles.iconWrapper}>
        <MaterialIcons name="person" size={28} color={colors.darkHighlight} />
      </TouchableOpacity> */}
      <View>
        <Image
          source={require("@/assets/images/BCH-Logo-Stacked-WHITE.png")}
          resizeMode="contain"
          style={{
            marginRight: "auto",
            height: 44,
            width: 128,
          }}
        />
      </View>

      <TouchableOpacity
        style={[styles.iconWrapper, { marginLeft: "auto" }]}
        onPress={() => router.push("/settings")}
      >
        <MaterialIcons name="settings" size={28} color={colors.darkHighlight} />
      </TouchableOpacity>
    </ThemedView>
  );
}
