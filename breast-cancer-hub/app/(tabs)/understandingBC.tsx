import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function UnderstandingBC() {
  const [progress, setProgress] = useState(0);

  // Functions for buttons (to update progress)
  const handleBack = () => {
    setProgress(Math.max(progress - 0.1, 0)); // Decrease progress
  };

  const handleNext = () => {
    setProgress(Math.min(progress + 0.1, 1)); // Increase progress
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.whiteOverlay}>
          <ThemedView style={styles.background}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText style={styles.understandingText}>Understanding</ThemedText>
              <ThemedText style={styles.bcText}>Breast Cancer</ThemedText>
            </ThemedView>
            <View style={styles.grayLine} />
            <ThemedView>
              <ThemedText style={styles.paragraphTextTitle}>What is Breast Cancer?</ThemedText>
            </ThemedView>
          </ThemedView>
        </View>
      </ScrollView>

      {/* Custom Progress Bar */}
      <View style={[styles.progressBarBackground, { width: `${progress * 100}%` }]} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E93C92', // Pink background behind the overlay
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 75, // Ensure no overlap with the fixed pink header
  },
  whiteOverlay: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderColor: 'black',
    padding: 20, // Add padding inside the white overlay
    marginBottom: 20, // Optional: add space at the bottom
    height: '100%',
  },
  background: {
    borderColor: '#E93C92', 
    flex: 1,
    padding: 20,
  },
  titleContainer: {},
  understandingText: {
    color: '#000000',
    fontSize: 32,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  bcText: {
    color: '#E93C92',
    fontSize: 32,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  grayLine: {
    height: 2, 
    backgroundColor: '#D3D3D3', 
    marginVertical: 20, 
  },
  paragraphTextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E93C92',
    position: 'absolute',
    bottom: 70, // Position at the bottom
    left: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingBottom: 20, // Bottom space for buttons
  },
  button: {
    backgroundColor: '#E93C92',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});