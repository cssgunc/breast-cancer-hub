import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

const languages = ['EN', 'SP', 'FR', 'RU', 'ZH'];

export function SelectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const toggleLanguage = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <ThemedView>
      {/* Button to open the dropdown */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <ThemedText style={styles.selectLanguageText}>Select Language</ThemedText>
        <ThemedText style={styles.separator}> | </ThemedText>
        <ThemedText style={styles.language}>{selectedLanguage}</ThemedText>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </TouchableOpacity>

      {/* Dropdown content */}
      {isOpen && (
        <ThemedView style={styles.dropdown}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              style={styles.languageOption}
              onPress={() => toggleLanguage(language)}>
              <ThemedText>{language}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    width: 217,
    height: 48,
    backgroundColor: '#f0f0f0', // Light grey background
    paddingHorizontal: 12, // Padding for button content
    borderWidth: 1,
    borderColor: '#cccccc', // Border color for button
  },
  selectLanguageText: {
    color: '#808080', // Grey color for 'Select Language'
    fontSize: 16,
  },
  separator: {
    color: '#cccccc', // Light grey color for separator '|'
    marginHorizontal: 8,
  },
  language: {
    color: '#000000', // Black color for the selected language (can change based on theme)
    fontSize: 16,
  },
  dropdown: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9', // Background for dropdown
  },
  languageOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
});
