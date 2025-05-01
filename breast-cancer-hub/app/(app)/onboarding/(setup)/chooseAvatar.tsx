import { useColors } from "@/components/style/ColorContext";
import { ThemedText } from "@/components/style/ThemedText";
import { ThemedView } from "@/components/style/ThemedView";
import { saveSetting } from "@/hooks/useSettings";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet } from "react-native";
import { onboardingStyles } from "..";
export default function ChooseAvatar() {
  const { colors, globalStyles } = useColors();

  const avatarPress = async (avatarType: boolean) => {
    try {
      saveSetting("avatar", avatarType);
    } catch (e) {
      console.error(e);
    }
  };

  const styles = StyleSheet.create({
    avatar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 50,
      marginTop: 15,
      marginBottom: 15,
    },
    image: {
      width: 300,
      height: 300,
    },
  });

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
      <ThemedView style={styles.avatar}>
        <TouchableOpacity onPress={() => avatarPress(false)}>
          <Image
            source={require("@/assets/images/FEMALE ART 1.jpg")}
            style={styles.image}
          />
          <ThemedText type="heading" colored style={{ textAlign: "center" }}>
            Female Avatar
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => avatarPress(true)}>
          <Image
            source={require("@/assets/images/MALE ART 1.jpg")}
            style={styles.image}
          />
          <ThemedText type="heading" colored style={{ textAlign: "center" }}>
            Male Avatar
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}
