/**
 * Below are all design token constants used in the app.
 * Colors are defined for light (pink) and dark (indigo) mode.
 * Spacing and typography (font size) constants are shared across both modes.
 **/

export const sharedColors = {
  white: "#FFFFFF",
  black: "#000000",

  darkGray: "#3E3E3E",
  mediumGray: "#666666",
  lightGray: "#999999",
  lighterGray: "#ACACAC",
  lightestGray: "#D3D3D3",

  backgroundGray: "#ECECEC",
  backgroundLightGray: "#FFF7FD",
  backgroundLightGrayPurplish: "#FAF7FF",

  grayHomePageLearnMoreButton: "#D5D5D5",

  blue: "#68C4FF", // Used for links
  green: "#339F00", // Used for green check mark after self exam

  text: "#67696d",
  background: "#ffffff",
  tint: "#e93c92",
  icon: "#b31581",
  tabIconDefault: "#720572",
  tabIconSelected: "#f0efef",
};

export const lightColors = {
  darkestHighlight: "#A1145B",
  darkHighlight: "#E93C92",
  mediumHighlight: "#F5C4DC", // Used only in some circular icons in settings and CustomizeExamDateScreen
  lightHighlight: "#EFCEE6",
};

export const darkColors = {
  darkestHighlight: "#30186F",
  darkHighlight: "#65558F",
  mediumHighlight: "#C2B8DD", // Used only in some circular icons in settings and CustomizeExamDateScreen
  lightHighlight: "#B7A4EB",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};
export type Spacing = keyof typeof spacing;

export const typography = {
  fontSize: {
    xs: 12, // captions, fine print
    small: 14, // small body text
    base: 16, // default paragraph
    subheading: 18, // subheadings
    heading: 24, // section headings
    title: 32, // page titles
  },
};
export type FontSize = keyof typeof typography.fontSize;
