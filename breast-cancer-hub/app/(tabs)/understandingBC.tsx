import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router'; // Adjust import based on your navigation library

export default function UnderstandingBC() {
  const [progress, setProgress] = useState(0.15);

  const handleBack = () => {
    setProgress(Math.max(progress - 0.1, 0));
  };

  const handleNext = () => {
    setProgress(Math.min(progress + 0.1, 1));
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
            <ThemedText style={styles.paragraphTextTitle}>What is Breast Cancer?</ThemedText>
            <Text style={styles.paragraphText}>
              Cancer: the development of abnormal cells that divide uncontrollably and possess the ability to infiltrate and demolish normal body tissue.
              {"\n\n"}In the body, there are trillions of cells that grow and divide to help the body function properly. Cells die when they become old or damaged, and new cells replace them.
              {"\n\n"}Breast Cancer is when cancer forms in the breast. This disease can occur in both women and men, but is far more prevalent in women.
            </Text>
            <View style={styles.statContainer}>
              <Text style={styles.statTextBold}>2nd</Text>
              <Text style={styles.statText}>most common cancer in women</Text>
              <Text style={styles.statTextBold}>1 out of 8</Text>
              <Text style={styles.statText}>women will develop invasive breast cancer over the course of her lifetime</Text>
            </View>
            <ThemedView style={styles.learnMoreTextContainer}>
              <Text style={styles.infoSourceText}>Information is sourced from Breast Cancer Hub</Text>
              <Link href="/" asChild>
                <Pressable>
                  <Text style={styles.learnMoreText}>Learn more here</Text>
                </Pressable>
              </Link>            
            </ThemedView>

            {/* Progress Bar */}
            <ThemedView style={styles.progressBarOuterContainer}>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
              </View>
            </ThemedView>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonBack} onPress={handleBack}>
                <Text style={styles.buttonTextBack}>Back</Text>
              </Pressable>
              <Pressable style={styles.buttonNext} onPress={handleNext}>
                <Text style={styles.buttonTextNext}>Next</Text>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E93C92', // Pink background
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
  },
  whiteOverlay: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
  },
  background: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  understandingText: {
    color: '#000000',
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  bcText: {
    color: '#E93C92',
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  grayLine: {
    height: 2,
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
  },
  paragraphTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  paragraphText: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
    lineHeight: 24,
  },
  statContainer: {
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderLeftWidth: 4,
    borderColor: '#E93C92',
    marginVertical: 15,
  },
  statTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E93C92',
  },
  statText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10
  },
  infoSourceText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 20,
    fontStyle: 'italic'
  },
  learnMoreText: {
    fontSize: 12,
    color: '#68C4FF',
    fontWeight: 'bold',
  },
  learnMoreTextContainer: {
    alignItems: 'center'
  },
  progressBarOuterContainer: {
    alignItems: 'center'
  },
  progressBarContainer: {
    height: 20,
    width: '80%',
    backgroundColor: '#F5C4DC',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#E93C92',
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBack: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ACACAC',
  },
  buttonNext: {
    backgroundColor: '#E93C92',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonTextBack: {
    color: '#E93C92',
    fontSize: 16,
    backgroundColor: 'FFFFFF',
  },
  buttonTextNext: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});