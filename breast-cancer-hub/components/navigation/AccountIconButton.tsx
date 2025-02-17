import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../StyleSheet";

export default function IconButton() {
  return (
    <Link href="/" asChild>
      <Pressable style={styles.button}>
        <MaterialIcons name="account-circle" size={24} color={colors.darkPink} />
      </Pressable>
    </Link>
  );
}

export const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightPink,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
