/**
 * This file contains shared layout styles using the applied color scheme.
 * It will read the design tokens and apply them to generate a stylesheet.
 */
import { StyleSheet } from "react-native";
import { ColorTheme } from "./ColorContext";

export const makeGlobalStyles = (colors: ColorTheme) => {
  return StyleSheet.create({
    // Containers and formatting
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: colors.darkHighlight,
    },

    bodyContainerWhite: {
      flex: 1,
      backgroundColor: colors.white,
    },
    bodyContainerDarkHighlight: {
      flex: 1,
      backgroundColor: colors.darkHighlight,
    },

    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      gap: 8,
    },

    // Content within a scrollable list or card
    scrollContent: {
      flexGrow: 1,
    },

    whiteOverlay: {
      flex: 1,
      backgroundColor: colors.white,
      borderTopLeftRadius: 17,
      borderTopRightRadius: 17,
      padding: 20,
    },

    grayLine: {
      height: 2,
      backgroundColor: colors.lightestGray,
      marginVertical: 10,
    },

    listContainer: {
      flexDirection: "column",
      paddingVertical: 20,
      justifyContent: "flex-start",
      alignContent: "flex-start",
    },
    listItemContainer: {
      flexDirection: "row",
      columnGap: 20,
      textAlign: "left",
      textAlignVertical: "bottom",
      paddingHorizontal: 20,
      marginVertical: 5,
      paddingVertical: 5,
    },

    elevatedCard: {
      backgroundColor: colors.backgroundLightGray,
      borderRadius: 16,
      padding: 20,
      marginBottom: 15,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    // Text
    // Font size 16 is common for body text, but most pages have many variations on margins, styles, color, etc.
    // Similar to text used in the Learn More container.
    smallItalicText: {
      fontSize: 12,
      fontStyle: "italic",
      color: colors.lightGray,
    },

    buttonBackNextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },

    // Onboarding buttons
    settingsButton: {
      //Copied from base button
      minWidth: 128,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 50,
      borderWidth: 2,
      alignItems: "center",
      //New
      backgroundColor: colors.white,
      borderColor: colors.lighterGray,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30,
      marginBottom: 30,
    },

    // LOGIN/SIGNUP
    loginBodyContainer: {
      //COMMON
      flex: 1,
      padding: 10,
    },
    loginTopText: {
      //COMMON
      marginBottom: 20,
      marginTop: 100,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    loginPopText: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loginInputsContainer: {
      //COMMON
      width: "100%",
      alignItems: "center",
    },
    loginInputContainer: {
      //COMMON
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundGray,
      borderRadius: 40,
      paddingHorizontal: 15,
      marginVertical: 10,
      height: 60,
    },
    loginEmailInputContainer: {
      //COMMON
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.white,
      borderRadius: 40,
      paddingHorizontal: 15,
      marginVertical: 10,
      borderColor: colors.darkHighlight,
      borderWidth: 2,
      height: 60,
    },
    loginInput: {
      //COMMON with emailInput
      flex: 1,
      fontSize: 15,
      height: 60,
      //borderColor: colors.darkHighlight,
    },
    loginPasswordInput: {
      //COMMON
      flex: 1,
      fontSize: 15,
      height: 60,
    },
    loginIcon: {
      //COMMON
      marginHorizontal: 10,
    },
    loginButton: {
      //COMMON
      width: "80%",
      marginTop: 20,
    },
    loginLink: {
      //COMMON
      color: colors.blue,
      fontSize: 15,
    },

    // Account & Settings Icon Button
    HeaderIconButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.lightHighlight,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
  });
};
