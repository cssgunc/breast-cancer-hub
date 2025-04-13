import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColors } from "@/components/ColorContext";

export default function IconButton() {
  const {colors, globalStyles, setDarkMode} = useColors();

  return (
    <Link href="/" asChild>
      <Pressable style={globalStyles.HeaderIconButton}>
        <MaterialIcons name="account-circle" size={24} color={colors.darkHighlight} />
      </Pressable>
    </Link>
  );
}


