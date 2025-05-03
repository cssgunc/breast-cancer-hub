import { View, type ViewProps } from "react-native";
import { useColors } from "./ColorContext";

export type ThemedViewProps = ViewProps & {
  bgColor?: string;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  bgColor,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { colors } = useColors();
  const background = bgColor ? bgColor : colors.background;
  return (
    <View style={[{ backgroundColor: background }, style]} {...otherProps} />
  );
}
