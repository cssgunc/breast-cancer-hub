import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import { useRouter } from "expo-router";
import AccountSettingsHeaderComponent from "@/app/(app)/settings/(components)/AccountSettingsHeader";
import { getSetting } from "@/hooks/useSettings";
import { useColors } from "@/components/style/ColorContext";

export default function HomeScreen() {
  const router = useRouter();
  const { colors, globalStyles } = useColors();

  const [isLoading, setIsLoading] = useState(true);
  const [checkText, setCheckText] = useState("");

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting("schedulingType");
      if (schedulingType == "period") {
        setCheckText("Check yourself a week after your period starts.");
      } else {
        setCheckText("Check yourself the same day every month.");
      }
      setIsLoading(false);
    };

    getType();
  }, []);

  const styles = StyleSheet.create({
    headerWhite: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: colors.white,
    },
    whiteOverlay: {
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    titleTextDarkHighlight: {
      marginBottom: 15,
      paddingTop: 10,
    },

    buttonBackNextContainer: {
      flexDirection: "column",
      rowGap: 20,
      alignItems: "center",
    },
    buttonBack: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: "60%",
    },
    buttonNext: {
      paddingVertical: 10,
      paddingHorizontal: 40,
      width: "60%",
    },
    buttonTextBack: {
      fontSize: 14,
    },
  });

  return (
    <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
      <AccountSettingsHeaderComponent />

      <ThemedView style={[globalStyles.whiteOverlay, styles.whiteOverlay]}>
        <ThemedText type="title" colored style={styles.titleTextDarkHighlight}>
          You're All Set!
        </ThemedText>
        <ThemedView style={globalStyles.grayLine} />

        <View>
          <div
            style={{
              width: "100%",
              height: "100%",
              minWidth: "200px",
              minHeight: "200px",
              borderRadius: "50%",
              backgroundColor: colors.darkHighlight,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("@/assets/images/BCH App Image 4.png")}
                style={{
                  width: "75%",
                  height: "77.5%",
                  borderWidth: 0,
                  objectFit: "contain",
                }}
              />
            </View>
          </div>
        </View>

        <ThemedView style={styles.headerWhite}>
          <ThemedText type="heading">Navigate to your calendar now.</ThemedText>
        </ThemedView>

        <ThemedView>
          <ThemedText style={globalStyles.smallItalicText}>
            {checkText}
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            globalStyles.buttonBackNextContainer,
            styles.buttonBackNextContainer,
          ]}
        >
          <TouchableOpacity
            style={[globalStyles.buttonNext, styles.buttonNext]}
            onPress={() => router.push("/")}
          >
            <ThemedText style={[globalStyles.buttonTextNext]}>
              Let's Go!
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.buttonBack, styles.buttonBack]}
            onPress={() =>
              Linking.openURL(
                "https://www.breastcancerhub.org/about-breast-cancer"
              )
            }
          >
            <ThemedText
              style={[globalStyles.buttonTextBack, styles.buttonTextBack]}
            >
              Explore Early Detection for Other Cancers
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
