import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useColors } from "./ColorContext";

const LoadingScreen = () => {
  const { colors } = useColors();

  // Styles for the LoadingScreen
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 180,
      height: 187,
      marginBottom: 30,
    },
    title: {
      fontFamily: "SpaceMono-Regular",
      fontSize: 27,
      color: "#720472",
      fontWeight: "bold",
      marginBottom: 10,
    },
    subtitle: {
      fontFamily: "SpaceMono-Regular",
      fontSize: 14,
      color: "#720472",
      marginBottom: 50,
    },
    spinner: {
      position: "absolute",
      bottom: 50,
    },
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/BCH ribbon.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>BREAST CANCER HUB</Text>

      <Text style={styles.subtitle}>AWARENESS • EDUCATION • RESEARCH</Text>

      <ActivityIndicator size="large" color="#720472" style={styles.spinner} />
    </View>
  );
};

export default LoadingScreen;
