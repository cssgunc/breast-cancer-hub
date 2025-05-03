/**
 * Below are all design token constants used in the app.
 * Colors are defined for light (pink) and dark (indigo) mode.
 * Spacing and typography (font size) constants are shared across both modes.
 **/

export interface ColorTheme {
  white: string;
  black: string;

  darkestHighlight: string;
  darkHighlight: string;
  mediumHighlight: string;
  lightHighlight: string;

  darkGray: string;
  mediumGray: string;
  lightGray: string;
  lighterGray: string;
  lightestGray: string;

  backgroundGray: string;
  backgroundLightGray: string;

  blue: string;
  green: string;
  red: string;

  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export const sharedColors = {
  white: "#FFFFFF",
  black: "#000000",

  darkGray: "#3E3E3E",
  mediumGray: "#666666",
  lightGray: "#999999",
  lighterGray: "#ACACAC",
  lightestGray: "#D3D3D3",

  backgroundGray: "#ECECEC",

  blue: "#68C4FF", // Used for links
  green: "#339F00", // Used for green check mark after self exam
  red: "#FF4D4D",

  text: "#67696d",
  background: "#ffffff",
  tint: "#e93c92",
  icon: "#b31581",
  tabIconDefault: "#720572",
  tabIconSelected: "#f0efef",
};

export const lightColors = {
  backgroundLightGray: "#FFF7FD",

  darkestHighlight: "#A1145B",
  darkHighlight: "#E93C92",
  mediumHighlight: "#F5C4DC", // Used only in some circular icons in settings and CustomizeExamDateScreen
  lightHighlight: "#EFCEE6",
};

export const darkColors = {
  backgroundLightGray: "#FAF7FF",

  darkestHighlight: "#30186F",
  darkHighlight: "#65558F",
  mediumHighlight: "#C2B8DD", // Used only in some circular icons in settings and CustomizeExamDateScreen
  lightHighlight: "#B7A4EB",
};
