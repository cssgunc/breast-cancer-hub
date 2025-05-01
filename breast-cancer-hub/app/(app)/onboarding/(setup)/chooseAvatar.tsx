import { useColors } from "@/components/style/ColorContext";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { getSetting, saveSetting } from "@/hooks/useSettings";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet } from "react-native";
import { onboardingStyles } from "..";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
export default function ChooseAvatar() {
  const { colors, globalStyles } = useColors();
  const [selected, setSelected] = useState<boolean | null>(null);

  const avatarPress = async (avatarType: boolean) => {
    try {
      await saveSetting("avatar", avatarType);
      setSelected(avatarType);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ThemedView style={onboardingStyles.titleContainer}>
        <ThemedText type="title">Choose Your</ThemedText>
        <ThemedText
          type="title"
          colored
          style={onboardingStyles.highlightedTitleText}
        >
          Self Examination Avatar
        </ThemedText>
      </ThemedView>
      <ThemedView style={globalStyles.grayLine} />
      <ThemedView style={onboardingStyles.bodyContainer}>
        <ThemedView style={styles.avatar}>
          <TouchableOpacity
            onPress={() => avatarPress(false)}
            style={[
              { flex: 1 },
              selected === false && {
                borderColor: colors.darkHighlight,
                borderWidth: 3,
              },
            ]}
            activeOpacity={0.8}
          >
            <Image
              source={require("@/assets/images/FEMALE ART 1.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
            {selected === false && (
              <ThemedView style={styles.checkmark}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.darkHighlight}
                />
              </ThemedView>
            )}
            <ThemedText type="heading" colored style={{ textAlign: "center" }}>
              Feminine
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => avatarPress(true)}
            style={[
              { flex: 1 },
              selected === true && {
                borderColor: colors.darkHighlight,
                borderWidth: 3,
              },
            ]}
            activeOpacity={0.8}
          >
            <Image
              resizeMode="contain"
              source={require("@/assets/images/MALE ART 1.jpg")}
              style={styles.image}
            />
            {selected === true && (
              <ThemedView style={styles.checkmark}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.darkHighlight}
                />
              </ThemedView>
            )}
            <ThemedText type="heading" colored style={{ textAlign: "center" }}>
              Masculine
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
  },
});
