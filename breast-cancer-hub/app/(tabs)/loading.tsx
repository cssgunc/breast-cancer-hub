import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";


const SplashScreen = () => {
return (
<View style={styles.container}>

<Image source={require('../../assets/images/BCH Ribbon 1 (1).png')} style={styles.logo} />

<Text style={styles.title}>BREAST CANCER HUB</Text>


<Text style={styles.subtitle}>AWARENESS • EDUCATION • RESEARCH</Text>


<ActivityIndicator size="large" color="#720472" style={styles.spinner} />
</View>
);
};

// Styles for the SplashScreen
const styles = StyleSheet.create({
container: {
   flex: 1,
   backgroundColor: "#ffffff",
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


export default SplashScreen;