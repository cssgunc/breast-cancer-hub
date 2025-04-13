import React from "react";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColors } from "@/components/ColorContext";

export default function IconButton() {
  const {colors, globalStyles, setDarkMode} = useColors();

  return (
    <Link href="/settings" asChild>
      <Pressable style={globalStyles.HeaderIconButton}>
        <MaterialIcons name="settings" size={24} color={colors.darkHighlight} />
      </Pressable>
    </Link>
  );
}
