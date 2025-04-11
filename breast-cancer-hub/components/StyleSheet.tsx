import { StyleSheet } from "react-native";

export const colors = {
  white: "#FFFFFF",
  black: "#000000",

  darkestPink: "#A1145B",
  darkPink: "#E93C92",
  mediumPink: "#F5C4DC", // Used only in some circular icons in settings and CustomizeExamDateScreen
  lightPink: "#EFCEE6",

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
    backgroundColor: colors.darkPink,
  },

  bodyContainerWhite: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bodyContainerDarkPink: {
    flex: 1,
    backgroundColor: colors.darkPink,
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
  titleTextDarkPink: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.darkPink,
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
    backgroundColor: colors.darkPink,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.darkPink,
  },
  buttonTextBack: {
    color: colors.darkPink,
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextNext: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  
})