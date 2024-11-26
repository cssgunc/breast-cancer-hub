import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from "./ThemedView";

export function AccountSettingsHeaderComponent() {
  return (
    <ThemedView style={styles.header}>
    <TouchableOpacity style={styles.iconWrapper}
    // onPress={() => router.push('/account')}
    >
      <MaterialIcons name="person" size={28} color="#E93C92"/>
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('/settings')} >
      <MaterialIcons name="settings" size={28} color="#E93C92" />
    </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E93C92',
  },
  iconWrapper: {
    backgroundColor: '#EFCEE6',
    borderRadius: 30,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
})