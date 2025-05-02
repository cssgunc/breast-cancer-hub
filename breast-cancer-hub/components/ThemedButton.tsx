import React from "react";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/style/ThemedText";
import { useColors } from "@/components/style/ColorContext";

type Variant = "primary" | "secondary";

interface ThemedButtonProps {
  variant?: Variant;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function ThemedButton({
  variant = "primary",
  onPress,
  style,
  children,
  disabled,
}: ThemedButtonProps) {
  const { colors } = useColors();
  const isPrimary = variant === "primary";

  const dynamicButtonStyle = {
    backgroundColor: isPrimary ? colors.darkHighlight : colors.white,
    borderColor: isPrimary ? colors.darkHighlight : colors.lighterGray,
  };

  const dynamicTextStyle = {
    color: isPrimary ? colors.white : colors.darkHighlight,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.baseButton, dynamicButtonStyle, style]}
      disabled={disabled}
    >
      <ThemedText style={[styles.baseButtonText, dynamicTextStyle]}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    minWidth: 128,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    borderWidth: 2,
    alignItems: "center",
  },
  baseButtonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
