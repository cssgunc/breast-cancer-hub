import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../StyleSheet";
import {styles} from "./AccountIconButton";

export default function IconButton() {
  return (
    <Link href="/settings" asChild>
      <Pressable style={styles.button}>
        <MaterialIcons name="settings" size={24} color={colors.darkPink} />
      </Pressable>
    </Link>
  );
}

// This button's "styles" is the same as the AccountIconButton.