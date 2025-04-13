import { StyleSheet } from "react-native";

const _darkestPurple = "#30186F";
const _darkPurple = "#65558F";
const _mediumPurple = "#C2B8DD";
const _lightPurple = "#B7A4EB";

const _darkestPink = "#A1145B";
const _darkPink = "#E93C92";
const _mediumPink = "#F5C4DC"; // Used only in some circular icons in settings and CustomizeExamDateScreen
const _lightPink = "#EFCEE6";

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

  darkestHighlight: isDarkThemeEnabled ? _darkestPink : _darkestPurple,
  darkHighlight: isDarkThemeEnabled ? _darkPink : _darkPurple,
  mediumHighlight: isDarkThemeEnabled ? _mediumPink : _mediumPurple,
  lightHighlight: isDarkThemeEnabled ? _lightPink : _lightPurple,

  darkGray: "#3E3E3E",
  mediumGray: "#666666",
  lightGray: "#999999",
  lighterGray: "#ACACAC",
  lightestGray: "#D3D3D3",

  backgroundGray: "#ECECEC",
  backgroundLightGray: "#FFF7FD",

  grayHomePageLearnMoreButton: "#D5D5D5",

  blue: "#68C4FF", // Used for links

  green: "#339F00", // Used for green check mark after self exam
}

export var lightColors = {
  white: "#FFFFFF",
  black: "#000000",

  darkestHighlight: _darkestPink,
  darkHighlight: _darkPink,
  mediumHighlight: _mediumPink,
  lightHighlight: _lightPink,

  darkGray: "#3E3E3E",
  mediumGray: "#666666",
  lightGray: "#999999",
  lighterGray: "#ACACAC",
  lightestGray: "#D3D3D3",

  backgroundGray: "#ECECEC",
  backgroundLightGray: "#FFF7FD",

  grayHomePageLearnMoreButton: "#D5D5D5",

  blue: "#68C4FF", // Used for links

  green: "#339F00", // Used for green check mark after self exam
}

export var darkColors = {
  white: "#FFFFFF",
  black: "#000000",

  darkestHighlight: _darkestPurple,
  darkHighlight: _darkPurple,
  mediumHighlight: _mediumPurple,
  lightHighlight: _lightPurple,

  darkGray: "#3E3E3E",
  mediumGray: "#666666",
  lightGray: "#999999",
  lighterGray: "#ACACAC",
  lightestGray: "#D3D3D3",

  backgroundGray: "#ECECEC",
  backgroundLightGray: "#FFF7FD",

  grayHomePageLearnMoreButton: "#D5D5D5",

  blue: "#68C4FF", // Used for links

  green: "#339F00", // Used for green check mark after self exam
}

export const globalStyles = StyleSheet.create({

  // Containers and formatting

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
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

  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
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
    paddingHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 5,
  },

  elevatedBox: {
    backgroundColor: colors.backgroundLightGray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Text

  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.black,
    lineHeight: 32,
  },
  titleTextDarkHighlight: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.darkHighlight,
    lineHeight: 32,
  },

  listTitleTextExam: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    // marginTop: 20,
    // marginBottom: 10,
  },
  mediumBoldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  // Font size 16 is common for body text, but most pages have many variations on margins, styles, color, etc.
  // Similar to text used in the Learn More container.
  smallItalicText: {
    fontSize: 12,
    fontStyle: "italic",
    color: colors.lightGray
  },

  // Back/Next Buttons
  buttonBackNextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
  buttonNext: {
    backgroundColor: colors.darkHighlight,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.darkHighlight,
  },
  buttonTextBack: {
    color: colors.darkHighlight,
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextNext: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  
})