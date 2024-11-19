import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function UnderstandingBC() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* Header Container */}
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.whiteOverlay}>
          <ThemedView style={styles.background}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText style={styles.understandingText}>Understanding</ThemedText>
              <ThemedText style={styles.bcText}>Breast Cancer</ThemedText>
            </ThemedView>
            <ThemedView style={styles.grayLine} />
            <ThemedText style={styles.paragraphTextTitle}>What is Breast Cancer?</ThemedText>
            <ThemedText style={styles.paragraphText}>
              Cancer: the development of abnormal cells that divide uncontrollably and possess the ability to infiltrate and demolish normal body tissue.
              {"\n\n"}In the body, there are trillions of cells that grow and divide to help the body function properly. Cells die when they become old or damaged, and new cells replace them.
              {"\n\n"}Breast Cancer is when cancer forms in the breast. This disease can occur in both women and men, but is far more prevalent in women.
            </ThemedText>
            <ThemedView style={styles.statContainer}>
              <ThemedText style={styles.statTextBold}>2nd</ThemedText>
              <ThemedText style={styles.statText}>most common cancer in women</ThemedText>
              <ThemedText style={styles.statTextBold}>1 out of 8</ThemedText>
              <ThemedText style={styles.statText}>women will develop invasive breast cancer over the course of her lifetime</ThemedText>
            </ThemedView>
            <ThemedView style={styles.learnMoreTextContainer}>
              <ThemedText style={styles.infoSourceText}>Information is sourced from Breast Cancer Hub</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.learnMoreText}>Learn more here</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            {/* Buttons */}
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonBack}>
                <ThemedText style={styles.buttonTextBack}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNext}>
                <ThemedText style={styles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E93C92', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E93C92', 
  },
  iconWrapper: {
    backgroundColor: '#EFCEE6', // Light pink background
    borderRadius: 30, // Circular background
    padding: 8, // Add padding around the icon
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10, 
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
    marginBottom: 10,
  },
  infoSourceText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 20,
    fontStyle: 'italic',
  },
  learnMoreText: {
    fontSize: 12,
    color: '#68C4FF',
    fontWeight: 'bold',
  },
  learnMoreTextContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ACACAC',
  },
  buttonNext: {
    backgroundColor: '#E93C92',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E93C92',
  },
  buttonTextBack: {
    color: '#E93C92',
    fontSize: 20,
  },
  buttonTextNext: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});