import { StyleSheet } from "react-native";

const white = "#FFFFFF";
const black = "#000000";

const darkGray = "#3E3E3E";
const mediumGray = "#666666";
const lightGray = "#999999";
const lighterGray = "#ACACAC";
const lightestGray = "#D3D3D3";

const backgroundGray = "#ECECEC";
const backgroundLightGray = "#FFF7FD";

const grayHomePageLearnMoreButton = "#D5D5D5";

const blue = "#68C4FF"; // Used for links

const green = "#339F00"; // Used for green check mark after self exam

const darkestPurple = "#30186F";
const darkPurple = "#65558F";
const mediumPurple = "#C2B8DD";
const lightPurple = "#B7A4EB";

const darkestPink = "#A1145B";
const darkPink = "#E93C92";
const mediumPink = "#F5C4DC"; // Used only in some circular icons in settings and CustomizeExamDateScreen
const lightPink = "#EFCEE6";

export function setGlobalDarkThemeEnabled(enabled: boolean) {
  isDarkThemeEnabled = enabled;
  colors = enabled ? darkColors : lightColors;
}

var isDarkThemeEnabled : boolean = false;

export function getColors() {
  return isDarkThemeEnabled ? darkColors : lightColors;
}

export var colors = {
  white: "#FFFFFF",
  black: "#000000",

  darkestHighlight: isDarkThemeEnabled ? darkestPink : darkestPurple,
  darkHighlight: isDarkThemeEnabled ? darkPink : darkPurple,
  mediumHighlight: isDarkThemeEnabled ? mediumPink : mediumPurple,
  lightHighlight: isDarkThemeEnabled ? lightPink : lightPurple,

  darkGray: darkGray,
  mediumGray: mediumGray,
  lightGray: lightGray,
  lighterGray: lighterGray,
  lightestGray: lightestGray,

  backgroundGray: backgroundGray,
  backgroundLightGray: backgroundLightGray,

  grayHomePageLearnMoreButton: grayHomePageLearnMoreButton,

  blue: blue, // Used for links

  green: green, // Used for green check mark after self exam
}

export var lightColors = {
  white: white,
  black: black,

  darkestHighlight: darkestPink,
  darkHighlight: darkPink,
  mediumHighlight: mediumPink,
  lightHighlight: lightPink,

  darkGray: darkGray,
  mediumGray: mediumGray,
  lightGray: lightGray,
  lighterGray: lighterGray,
  lightestGray: lightestGray,

  backgroundGray: backgroundGray,
  backgroundLightGray: backgroundLightGray,

  grayHomePageLearnMoreButton: grayHomePageLearnMoreButton,

  blue: blue,

  green: green,
}

export var darkColors = {
  white: white,
  black: black,

  darkestHighlight: darkestPurple,
  darkHighlight: darkPurple,
  mediumHighlight: mediumPurple,
  lightHighlight: lightPurple,

  darkGray: darkGray,
  mediumGray: mediumGray,
  lightGray: lightGray,
  lighterGray: lighterGray,
  lightestGray: lightestGray,

  backgroundGray: backgroundGray,
  backgroundLightGray: backgroundLightGray,

  grayHomePageLearnMoreButton: grayHomePageLearnMoreButton,

  blue: blue,

  green: green,
}

export const globalStyles = StyleSheet.create({

  // Containers and formatting

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: lightColors.darkHighlight,
  },

  bodyContainerWhite: {
    flex: 1,
    backgroundColor: lightColors.white,
  },
  bodyContainerDarkHighlight: {
    flex: 1,
    backgroundColor: lightColors.darkHighlight,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
    backgroundColor: lightColors.white,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },

  grayLine: {
    height: 2,
    backgroundColor: lightColors.lightestGray,
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
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 5,
  },

  elevatedBox: {
    backgroundColor: lightColors.backgroundLightGray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: lightColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Text

  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: lightColors.black,
    lineHeight: 32,
  },
  titleTextDarkHighlight: {
    fontSize: 32,
    fontWeight: "bold",
    color: lightColors.darkHighlight,
    lineHeight: 32,
  },

  listTitleTextExam: {
    fontSize: 24,
    fontWeight: "bold",
    color: lightColors.black,
    // marginTop: 20,
    // marginBottom: 10,
  },
  mediumBoldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: lightColors.black,
  },
  // Font size 16 is common for body text, but most pages have many variations on margins, styles, color, etc.
  // Similar to text used in the Learn More container.
  smallItalicText: {
    fontSize: 12,
    fontStyle: "italic",
    color: lightColors.lightGray
  },

  // Back/Next Buttons
  buttonBackNextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: lightColors.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: lightColors.lighterGray,
  },
  buttonNext: {
    backgroundColor: lightColors.darkHighlight,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: lightColors.darkHighlight,
  },
  buttonTextBack: {
    color: lightColors.darkHighlight,
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextNext: {
    color: lightColors.white,
    fontSize: 18,
    textAlign: "center",
  },

  // LOGIN/SIGNUP
  loginBodyContainer: {//COMMON
    flex: 1,
    padding: 10,
  },
  loginTopText: {//COMMON
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
  loginTitleWelcomeText: {//COMMON
    color: colors.darkHighlight,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
    marginBottom: 3,
  },
  loginTitleText: {//COMMON
    color: colors.darkGray,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 35,
    marginTop: 3,
    lineHeight: 40,
  },
  loginTitleGrayText: {//COMMON
    color: colors.darkGray,
  },
  loginTitleHighlightText: {//COMMON
    color: colors.darkHighlight,
  },
  loginInputsContainer: {//COMMON
    width: "100%",
    alignItems: "center",
  },
  loginInputContainer: {//COMMON
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundGray,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 60,
  },
  login_emailInputContainer: {//COMMON
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
  loginInput: {//COMMON with emailInput
    flex: 1,
    fontSize: 15,
    height: 60,
    //borderColor: colors.darkHighlight,
  },
  loginPasswordInput: {//COMMON
    flex: 1,
    fontSize: 15,
    height: 60,
  },
  loginIcon: {//COMMON
    marginHorizontal: 10,
  },
  loginButton: {//COMMON
    backgroundColor: colors.darkHighlight,
    height: 60,
    width: "80%",
    borderRadius: 40,
    justifyContent: "center",
    marginTop: 20,
    
  },
  loginButtonText: {//COMMON
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  loginLink: {//COMMON
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
})

export const globalStylesLight = StyleSheet.create({

  // Containers and formatting

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: lightColors.darkHighlight,
  },

  bodyContainerWhite: {
    flex: 1,
    backgroundColor: lightColors.white,
  },
  bodyContainerDarkHighlight: {
    flex: 1,
    backgroundColor: lightColors.darkHighlight,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
    backgroundColor: lightColors.white,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },

  grayLine: {
    height: 2,
    backgroundColor: lightColors.lightestGray,
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
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 5,
  },

  elevatedBox: {
    backgroundColor: lightColors.backgroundLightGray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: lightColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Text

  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: lightColors.black,
    lineHeight: 32,
  },
  titleTextDarkHighlight: {
    fontSize: 32,
    fontWeight: "bold",
    color: lightColors.darkHighlight,
    lineHeight: 32,
  },

  listTitleTextExam: {
    fontSize: 24,
    fontWeight: "bold",
    color: lightColors.black,
    // marginTop: 20,
    // marginBottom: 10,
  },
  mediumBoldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: lightColors.black,
  },
  // Font size 16 is common for body text, but most pages have many variations on margins, styles, color, etc.
  // Similar to text used in the Learn More container.
  smallItalicText: {
    fontSize: 12,
    fontStyle: "italic",
    color: lightColors.lightGray
  },

  // Back/Next Buttons
  buttonBackNextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: lightColors.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: lightColors.lighterGray,
  },
  buttonNext: {
    backgroundColor: lightColors.darkHighlight,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: lightColors.darkHighlight,
  },
  buttonTextBack: {
    color: lightColors.darkHighlight,
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextNext: {
    color: lightColors.white,
    fontSize: 18,
    textAlign: "center",
  },

  // LOGIN/SIGNUP
  loginBodyContainer: {//COMMON
    flex: 1,
    padding: 10,
  },
  loginTopText: {//COMMON
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
  loginTitleWelcomeText: {//COMMON
    color: lightColors.darkHighlight,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
    marginBottom: 3,
  },
  loginTitleText: {//COMMON
    color: lightColors.darkGray,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 35,
    marginTop: 3,
    lineHeight: 40,
  },
  loginTitleGrayText: {//COMMON
    color: lightColors.darkGray,
  },
  loginTitleHighlightText: {//COMMON
    color: lightColors.darkHighlight,
  },
  loginInputsContainer: {//COMMON
    width: "100%",
    alignItems: "center",
  },
  loginInputContainer: {//COMMON
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightColors.backgroundGray,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 60,
  },
  loginEmailInputContainer: {//COMMON
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightColors.white,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: lightColors.darkHighlight,
    borderWidth: 2,
    height: 60,
  },
  loginInput: {//COMMON with emailInput
    flex: 1,
    fontSize: 15,
    height: 60,
    //borderColor: colors.darkHighlight,
  },
  loginPasswordInput: {//COMMON
    flex: 1,
    fontSize: 15,
    height: 60,
  },
  loginIcon: {//COMMON
    marginHorizontal: 10,
  },
  loginButton: {//COMMON
    backgroundColor: lightColors.darkHighlight,
    height: 60,
    width: "80%",
    borderRadius: 40,
    justifyContent: "center",
    marginTop: 20,
    
  },
  loginButtonText: {//COMMON
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  loginLink: {//COMMON
    color: lightColors.blue,
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
})

export const globalStylesDark = StyleSheet.create({

  // Containers and formatting

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: darkColors.darkHighlight,
  },

  bodyContainerWhite: {
    flex: 1,
    backgroundColor: darkColors.white,
  },
  bodyContainerDarkHighlight: {
    flex: 1,
    backgroundColor: darkColors.darkHighlight,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
    backgroundColor: darkColors.white,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },

  grayLine: {
    height: 2,
    backgroundColor: darkColors.lightestGray,
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
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 5,
  },

  elevatedBox: {
    backgroundColor: darkColors.backgroundLightGray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: darkColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Text

  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: darkColors.black,
    lineHeight: 32,
  },
  titleTextDarkHighlight: {
    fontSize: 32,
    fontWeight: "bold",
    color: darkColors.darkHighlight,
    lineHeight: 32,
  },

  listTitleTextExam: {
    fontSize: 24,
    fontWeight: "bold",
    color: darkColors.black,
    // marginTop: 20,
    // marginBottom: 10,
  },
  mediumBoldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: darkColors.black,
  },
  // Font size 16 is common for body text, but most pages have many variations on margins, styles, color, etc.
  // Similar to text used in the Learn More container.
  smallItalicText: {
    fontSize: 12,
    fontStyle: "italic",
    color: darkColors.lightGray
  },

  // Back/Next Buttons
  buttonBackNextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: darkColors.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: darkColors.lighterGray,
  },
  buttonNext: {
    backgroundColor: darkColors.darkHighlight,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: darkColors.darkHighlight,
  },
  buttonTextBack: {
    color: darkColors.darkHighlight,
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextNext: {
    color: darkColors.white,
    fontSize: 18,
    textAlign: "center",
  },

  // LOGIN/SIGNUP
  loginBodyContainer: {//COMMON
    flex: 1,
    padding: 10,
  },
  loginTopText: {//COMMON
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
  loginTitleWelcomeText: {//COMMON
    color: darkColors.darkHighlight,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 20,
    marginBottom: 3,
  },
  loginTitleText: {//COMMON
    color: darkColors.darkGray,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 35,
    marginTop: 3,
    lineHeight: 40,
  },
  loginTitleGrayText: {//COMMON
    color: darkColors.darkGray,
  },
  loginTitleHighlightText: {//COMMON
    color: darkColors.darkHighlight,
  },
  loginInputsContainer: {//COMMON
    width: "100%",
    alignItems: "center",
  },
  loginInputContainer: {//COMMON
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: darkColors.backgroundGray,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 60,
  },
  loginEmailInputContainer: {//COMMON
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: darkColors.white,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: darkColors.darkHighlight,
    borderWidth: 2,
    height: 60,
  },
  loginInput: {//COMMON with emailInput
    flex: 1,
    fontSize: 15,
    height: 60,
    //borderColor: colors.darkHighlight,
  },
  loginPasswordInput: {//COMMON
    flex: 1,
    fontSize: 15,
    height: 60,
  },
  loginIcon: {//COMMON
    marginHorizontal: 10,
  },
  loginButton: {//COMMON
    backgroundColor: darkColors.darkHighlight,
    height: 60,
    width: "80%",
    borderRadius: 40,
    justifyContent: "center",
    marginTop: 20,
    
  },
  loginButtonText: {//COMMON
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  loginLink: {//COMMON
    color: darkColors.blue,
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
})