import { StyleSheet } from "react-native";

export const white = "#FFFFFF"
export const black = "#000000"
export const darkPink = "#E93C92"
export const lightPink = "#EFCEE6"
export const darkGray = "#3E3E3E"
export const lightGray = "#999999"
export const lighterGray = "#ACACAC"
export const lightestGray = "#D3D3D3"
export const blue = "#68C4FF"

export const globalStyles = StyleSheet.create({

  // Containers and formatting

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#E93C92",
  },

  bodyContainerWhite: {
    flex: 1,
    backgroundColor: white,
  },
  bodyContainerDarkPink: {
    flex: 1,
    backgroundColor: darkPink,
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },

  iconWrapper: {
    backgroundColor: "#EFCEE6",
    borderRadius: 30,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  grayLine: {
    height: 2,
    backgroundColor: "#D3D3D3",
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
    paddingVertical: 10,
  },

  // Text

  //purposeOfExam
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    color: black,
    // paddingTop: 25,
  },
  titleTextDarkPink: {
    fontSize: 32,
    fontWeight: "bold",
    color: darkPink,
    // marginBottom: 15,
    // paddingTop: 10,
  },

  listTitleTextExam: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  mediumBoldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: black,
  },
  // Similar to text used in the Learn More container.
  smallItalicText: {
    fontSize: 12,
    fontStyle: "italic",
    color: lightGray
  },


  // Back/Next Buttons
  buttonBackNextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: lighterGray,
  },
  buttonNext: {
    backgroundColor: darkPink,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: darkPink,
  },
  buttonTextBack: {
    color: darkPink,
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextNext: {
    color: white,
    fontSize: 18,
    textAlign: "center",
  },
  

})