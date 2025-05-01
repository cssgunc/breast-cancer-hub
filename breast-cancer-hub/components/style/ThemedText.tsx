/**
 * This file defines the typography styles for the app.
 */
import { Text, type TextProps, StyleSheet } from "react-native";
import { useColors } from "./ColorContext";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "heading" | "caption" | "link";
  colored?: boolean
  bold?: boolean
  italic?: boolean
};

export function ThemedText({
  style,
  colored,
  bold,
  italic,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const {colors} = useColors();
  const color = colored ? colors.darkHighlight : colors.black;
  const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 16,
    color: colors.text,
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "bold",
    color: colors.blue,
  },
});

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "heading" ? styles.heading : undefined,
        type === "caption" ? styles.caption : undefined,
        type === "link" ? styles.link : undefined,
        style,
        bold && { fontWeight: "bold"},
        italic && { fontStyle: "italic"},
      ]}
      {...rest}
    />
  );
}
